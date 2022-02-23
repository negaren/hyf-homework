import React from "react";
import API_homework from "../../methods/homework"
import utils from "../../server/utils"
import { StudentHomework } from "../../components/Results";
import Results from "../../components/Results"
import Search from "../../components/Search"
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

export default function Page(props) {
  const router = useRouter()
  const [query, setQuery] = React.useState(router.query)
  const [newQuery, setNewQuery] = React.useState(router.query)
  const [isLoading, setIsLoading] = React.useState(false)
  const [homework, setHomework] = React.useState(false)
  const [isLoadingHomework, setIsLoadingHomework] = React.useState(true)

  if (props.notFound) return (
    <div style={{textAlign:"center"}}><h2>Class not found</h2><a href="/"><h4>Try another one</h4></a></div>
  )

  React.useEffect(() => {
    if (query.classNumber !== router.query.classNumber) {
      const removeShowingStudentFromQuery = {...query}
      delete query.student
      setQuery(removeShowingStudentFromQuery)
    }
    if (homework) {
      setIsLoading(false)
    }
  },[router.query])

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


  const homeworkFetcher = (student, noRedirect) => {
    setIsLoadingHomework(true)
    API_homework["homework"](student, props.query.classNumber).then((data) => {

      const studentHomework = { [student]: data.data.homeworkWeeks }
      const updatedHomework = { ...homework, ...studentHomework }

      setHomework(updatedHomework)

      setTimeout(() => {
        setIsLoadingHomework(false)
      }, 50)

    })
  }

  const listHomework = (student) => {
    if (isLoadingHomework && query.student === student) return (<h2 style={{ marginLeft: "1em", opacity: 0.6 }}>🚀 Fetching data from Github...</h2>)
    if (homework[student]) {
      return (
        <StudentHomework
          key={query.student}
          query={query}
          homework={homework[query.student]}
          moduleName={props.query.moduleName}
          weekNumber={props.query.weekNumber}
          student={query.student}></StudentHomework>
      )
    }
    return null
  }

  React.useEffect(() => {
    // if (!homework && props.students.length > 0) {
    //   homeworkFetcher(props.students[0].student)
    // }
    if (router.query.student && ! homework[router.query.student]) {
      homeworkFetcher(router.query.student)
    }
    if (isLoading) {
      setIsLoading(false)
    }
  }, [homework,router.query])


  return (
    <main className="homeworker">
      {/* {JSON.stringify(props.query)} */}
      {
        isLoading && (
          <div className="is-loading">
            <div>
              <h2 className="node-2">🔥</h2>
              <h2>🚀</h2>
              <h2 className="node-2">🔥</h2>
              <h3>Fetching</h3>
            </div>
          </div>
        )
      }
      <section className="homeworker-wrap">
        <Results
          key={props.query.classNumber}
          renderSearch={<Search {...searchProps} />}
          homework={homework}
          homeworkFetcher={homeworkFetcher}
          classNumber={props.query.classNumber}
          moduleName={props.query.moduleName}
          weekNumber={props.query.weekNumber}
          query={query}
          setQuery={(q) => {
            if (Object.values(q)[0] === "remove") {
              const removedFromQuery = { ...query }
              delete removedFromQuery[Object.keys(q)[0]]
              setQuery(removedFromQuery)
            }
            else {
              setQuery({ ...query, ...q })
              if (q.student) {
                setTimeout(() => {
                  homeworkFetcher(q.student)
                  // router.push(router.pathname.replace("[...classParams]",props.query.classNumber) + "?student="+q.student)
                  router.push({
                    pathname: router.asPath.includes("?student=") ? router.asPath.split("?")[0] : router.asPath,
                    query: { student: q.student }
                })
                }, 100)
              }
            }
          }}
          results={props.students}
          renderHomework={listHomework}></Results>
      </section>
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
