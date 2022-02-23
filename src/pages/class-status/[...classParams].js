import React from "react";
import API_homework from "../../methods/homework"
import utils from "../../server/utils"
import { StudentHomework } from "../../components/Results";
import Results from "../../components/Results"
import Search, {getHomeworkFolders} from "../../components/Search"
import { useRouter } from "next/router";

async function fetchClass(classNumber) {

  const classes = await utils.getClasses();
  if (!Object.keys(classes).find((key) => parseInt(key) === parseInt(classNumber))) {
    return ({ error: "The selected class is not active" });
  }

  const studentsInClass = classes[classNumber];
  if (!studentsInClass || studentsInClass && studentsInClass.length === 0) {
    return ({ error: "Found no students in that class" })
  }
  return ({ data: studentsInClass.map((githubUser) => ({ student: githubUser })) })
}

function calculatePercentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
} 

function PercentageBar(props) {
  const calcPerc = Math.floor(calculatePercentage(props.count, props.total))
  const percentage = calcPerc+"%"
  return (
    <div>
      <div className="percentage-bar-label">{props.label}</div>
    <div className="percentage-bar-container">
      <div className="percentage-bar" style={{width:percentage,backgroundColor:calcPerc === 100  ? "lightgreen" : ""}}></div>
      <div className="percentage-bar-number"><span style={{fontSize:"1.5rem"}}>{percentage}</span><br /><span style={{fontSize:"0.8rem",opacity:0.5}}>{props.suffix ? <>{props.count} of {props.total}</> : <>{props.count} of {props.total} students delivered</>}</span></div>
    </div>
    </div>
  )
}

function RenderMissing(props) {
  const [showMissing, setShowMissing] = React.useState(false)
  return (
    <div style={{position:"relative"}}>
      {
        showMissing
        && (
          <div style={{position:"absolute",bottom:"2em",borderRadius:"4px",boxShadow:"0 5px 25px rgba(0,0,0,0.2)",left:"2em",backgroundColor:"#fff",width:"100%",zIndex:9999,transform:"scale(0.8)"}}>
          <h3>Missing PRs from</h3>
      <div className="student-list">
        {props.missing.map((homework,i) => (
          <div key={i}>
            <div><a href={`/class/${props.classNumber}/?student=${homework.student}`} target="_blank" style={{color:"blue",textDecoration:"underline"}}>{homework.student}</a></div>
            <div>></div>
            <a href={homework.week.filesLink} target="_blank" style={{color:"blue",textDecoration:"underline"}}>Open repo</a>
            </div>
        ))}
      </div>
      </div>
        )
        
      }
      {props.missing.length > 0 ? (
          <button style={{marginTop:"1em"}} onClick={() => setShowMissing(!showMissing)}>Show missing PRs</button>
        ) : (
          <button style={{opacity:0,marginTop:"1em"}} >pretty layout</button>

        )}
      
    </div>
  )
}

function CalculateStats(props) {
  // const homeworkWeeks = props.homework && props.homework[0].data.homeworkWeeks.map((hw) => ({title:hw.pr.title,count:0}))
  const homeworkWeeks = getHomeworkFolders
  const countedWeeks = props.homework && props.homework.reduce((sorted, homeworkWeek) => {
    // if (homeworkWeek) {
    //   sorted[0].push(homeworkWeek.data.homeworkWeeks)
    // }
    homeworkWeek && homeworkWeek.data && homeworkWeek.data.homeworkWeeks.forEach((week) => {
      if (week.pr && week.pr.status === "merged") {
        sorted[week.homeworkFolder] = {...sorted[week.homeworkFolder], count:sorted[week.homeworkFolder].count + 1}
      }
      else {
        // sorted[week.homeworkFolder] = sorted[week.homeworkFolder].missing.push(week)
        sorted[week.homeworkFolder] = {...sorted[week.homeworkFolder], missing:[...sorted[week.homeworkFolder].missing, {student:homeworkWeek.data.student, week}]}

      }
    })
    return sorted
  }, homeworkWeeks.reduce((weeks,week) => {
    weeks[week] = {count:0,missing:[]}
    return weeks
  },{}))

  // const {count, missing} = countedWeeks
  
  const overallStatus = homeworkWeeks && homeworkWeeks.reduce((count, weekCount) => {
    return count + countedWeeks[weekCount].count
  },0)

  return (
    <div>
      <div style={{backgroundColor:"lightyellow",padding:"0.1em 2em 1em 2em",borderRadius:"5px"}}>
        <h1>Overall status</h1>
        <p style={{lineHeight:"1.66rem"}}>Every student needs to deliver {homeworkWeeks.length} weeks of homework by merging PRs.<br />{props.studentCount} students * {homeworkWeeks.length} weeks = {props.studentCount * homeworkWeeks.length} total homework deliveries<br /></p>
        <PercentageBar count={overallStatus} total={props.studentCount * homeworkWeeks.length} suffix=" delivered" />
       
      </div>
      <section className="stats-boxes">
      {
        homeworkWeeks && homeworkWeeks.map((homeworkWeek,i) => (
          <div key={i}>
          <PercentageBar label={homeworkWeek} count={countedWeeks[homeworkWeek].count} total={props.studentCount} />
          <RenderMissing classNumber={props.classNumber} missing={countedWeeks[homeworkWeek].missing} />
            </div>
        ))
      }
      </section>
      {/* <pre>{JSON.stringify(props.homework && props.homework[1].data.homeworkWeeks[1].pr,null,2)}</pre>
      <pre>{JSON.stringify(countedWeeks,null,2)}</pre> */}
      
    </div>
  )
}


export default function Page(props) {
  const router = useRouter()
  const [query, setQuery] = React.useState(router.query)
  const [newQuery, setNewQuery] = React.useState(router.query)
  const [isLoading, setIsLoading] = React.useState(false)
  const [homework, setHomework] = React.useState(false)
  const [isLoadingHomework, setIsLoadingHomework] = React.useState(true)

  const classNumber = props.query.classNumber

  if (props.notFound) return (
    <div style={{textAlign:"center"}}><h2>Class not found</h2><a href="/"><h4>Try another one</h4></a></div>
  )

  // React.useEffect(() => {
  //   if (query.classNumber !== router.query.classNumber) {
  //     const removeShowingStudentFromQuery = {...query}
  //     delete query.student
  //     setQuery(removeShowingStudentFromQuery)
  //   }
  //   if (homework) {
  //     setIsLoading(false)
  //   }
  // },[router.query])

  const searchProps = {
    query,
    classNumber: props.query.classNumber,
    moduleName:props.query.moduleName,
    handleChange: (key, value) => {
      console.log(value)
      let updateQ = { ...(newQuery || {}), [key]: value,student:router.query.student }
      if (key === "classNumber") {
        updateQ = {classNumber:value,classChange:true}
      }
      setNewQuery(updateQ)
    },
    handleSubmit: () => {
      setIsLoading(true)
      const url = ["/class"]
      if (newQuery.classNumber || props.query.classNumber) {
        url.push(newQuery.classNumber || props.query.classNumber)
      }
      if (newQuery.module) {
        url.push(newQuery.module)
      }
      if (newQuery.week) {
        url.push(newQuery.week)
      }

      const withStudent = ! newQuery.classChange ? "?student="+router.query.student : ""

      router.push(url.join("/") + withStudent, null, { shallow: false })
      setQuery(newQuery)
    }
  }


  const homeworkFetcher = (withData, student, noRedirect) => {
    setIsLoadingHomework(true)
    API_homework["homework"](student).then((data) => {

      const studentHomework = { [student]: (withData.data || data.data).homeworkWeeks }
      const updatedHomework = { ...homework, ...studentHomework }

      setHomework(updatedHomework)

      setTimeout(() => {
        setIsLoadingHomework(false)
      }, 50)

    })
  }

  
  React.useEffect(() => {
    // if (!homework && props.students.length > 0) {
    //   homeworkFetcher(props.students[0].student)
    // }
    // if (router.query.student && ! homework[router.query.student]) {
    //   homeworkFetcher(router.query.student)
    // }
    // if (isLoading) {
    //   setIsLoading(false)
    // }
    if ( ! localStorage.getItem("STATS_"+classNumber)) {
      // props.students && Promise.all(props.students.map(({student}) => API_homework["homework"](student))).then((allStudentHomework) => {
      //   console.log(allStudentHomework)
      //   setHomework(allStudentHomework)
      //   localStorage.setItem("ST",JSON.stringify(allStudentHomework))
      //   setIsLoading(false)
      // })
    }
    else {
      setHomework(JSON.parse(localStorage.getItem("STATS_"+classNumber)))
      setIsLoading(false)
    }
    // props.students && props.students.forEach(({student}) => {
    //   API_homework["homework"](student).then((data) => {

    //     const studentHomework = { [student]: (data.data).homeworkWeeks }
    //     const updatedHomework = { ...homework, ...studentHomework }
  
    //     setHomework(updatedHomework)
  
    //     setTimeout(() => {
    //       setIsLoadingHomework(false)
    //     }, 50)
  
    //   })
    // })
  }, [classNumber])

  const studentStats = (
    <div>
      <h3>{props.students.length} students</h3>
      <p>Stats based on how many has merged PR for each of the homework weeks</p>
    </div>
  )

  return (
      <main className="homeworker">
        <div className="homeworker-centered-container">
          {
            typeof window !== "undefined" && localStorage.getItem("STATS_"+classNumber) && (
              <div style={{paddingBottom:"0.6em",marginTop:"1em"}}>This page is cached – <a style={{color:"blue",textDecoration:"underline"}} onClick={() => {
                localStorage.removeItem("STATS_"+classNumber)
                setTimeout(() => {
                  window.location.reload()
                })
              }}>Clear cache</a></div>
            )
          }
          <h1>Stats for class {props.query.classNumber}</h1>
          {studentStats}
          {
            isLoading && (
              <h3>Stats is loading from github, hold on...</h3>
            )
          }
          {
            ! homework && ! isLoading && (
              <div style={{margin:"1em"}}><button onClick={() => {
                setIsLoading(true)
                props.students && Promise.all(props.students.map(({student}) => API_homework["homework"](student,classNumber))).then((allStudentHomework) => {
                  console.log(allStudentHomework)
                  setHomework(allStudentHomework)
                  localStorage.setItem("STATS_"+classNumber,JSON.stringify(allStudentHomework))
                  setIsLoading(false)
                })
              }}>Get the current stats</button><p style={{opacity:0.5,fontSize:"0.8rem"}}>The call might take up to 2 mins</p></div>
            )
          }
          {
            homework && (
              <CalculateStats classNumber={props.query.classNumber} homework={homework} studentCount={props.students.length}  />
            )
          }
        </div>
      </main>
  )
}
export async function getServerSideProps(context) {
  const [classNumber, moduleName = "", weekNumber = ""] = context.params.classParams
  const { data, error } = await fetchClass(parseInt(classNumber))

  if (!data) {
    return {
      props: { notFound: true },
    }
  }
  if (error) {
    return {
      props: { error }
    }
  }

  return {
    props: {
      students: data,
      query: {
        classNumber,
        moduleName,
        weekNumber
      }
    }, // will be passed to the page component as props
  }
}
