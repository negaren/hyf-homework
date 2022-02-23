import Search from "../components/Search"
import Explainer from "../components/Explainer"
import Results, { StudentHomework } from "../components/Results"
import API_homework from "../methods/homework"
import React from "react"
import { useRouter } from "next/dist/client/router"

function Frontpage(props) {
    return (
        <div className="home-frontpage">
            <div className="home-frontpage-image">
                <img src="https://www.hackyourfuture.dk/static/logo-round.svg" />
            </div>
            <div className="home-frontpage-container">
            <div>
                <h1>HYF Homeworktool</h1>
            </div>
            <div className="home-frontpage-search">
                {props.renderSearch}
            </div>
            </div>
        </div>
    )
}

const serialize = function(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

export default function Home(props) {
    const router = useRouter()
    const [query, setQuery] = React.useState(router.query)
    const [newQuery, setNewQuery] = React.useState(false)
    const [students, setStudents] = React.useState(false)
    const [homework, setHomework] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(false)
    const [isLoadingHomework, setIsLoadingHomework] = React.useState(true)


    const homeworkFetcher = (student, noRedirect) => {
        setIsLoadingHomework(true)
        API_homework["homework"](student).then((data) => {
            console.log(data)
            // setHomework({...homework,...data.data})
            const studentHomework = { [student]: data.data.homeworkWeeks }
            const updatedHomework = { ...homework, ...studentHomework }
            setHomework(updatedHomework)
            // localStorage.setItem("Q", JSON.stringify(data))
            noRedirect !== true && router.push(`${router.pathname}?${serialize(newQuery)}`)

            setTimeout(() => {
                setIsLoadingHomework(false)
            }, 50)

        })
    }


    React.useEffect(() => {
        if (localStorage.getItem("Qx")) {
            setStudents(JSON.parse(localStorage.getItem("Q")))
        }
        console.log(router.query)
        if (router.query && router.query.classNumber && ! query.classNumber) {
            setIsLoading(true)
            API_homework["query"](router.query.classNumber).then((data) => {
                console.log(data)
                setStudents(data)
                // localStorage.setItem("Q", JSON.stringify(data))
                setIsLoading(false)
                // setQuery({ student: data.data[0].student })
                setQuery({ student: data.data[0].student, ...router.query })
                setTimeout(() => {
                    // data.data.forEach((entry) => homeworkFetcher(entry.student))
                    homeworkFetcher(data.data[0].student, "noRedirect")
                }, 120)
            })
        }
    }, [router])



    const searchProps = {
        query:{...newQuery},
        keepInternalState:true,
        // key:JSON.stringify(newQuery),
        handleChange: (key, value) => {
            const q = { ...newQuery, [key]: value }
            // if (key === "classNumber") {
            //     if (query.classNumber && value !== query.classNumber) {
            //         q["student"] = ""
            //     }
            //     // delete q.student
            // }
            // setQuery(q)
            setNewQuery(q)

         },
        handleSubmit: () => {
            setIsLoading(true)
            router.push(`/class/${newQuery.classNumber}${newQuery.module ? "/"+newQuery.module.replace("/","-") : ""}${newQuery.week ? "/"+newQuery.week.replace("/","-") : ""}`)
            // router.push(`${router.pathname}?${serialize(newQuery)}`)
            // API_homework["query"](newQuery.classNumber).then((data) => {
            //     console.log(data)
            //     setStudents(data)
            //     // localStorage.setItem("Q", JSON.stringify(data))
            //     setIsLoading(false)
            //     setQuery({ student: data.data[0].student })
            //     setTimeout(() => {
            //         // data.data.forEach((entry) => homeworkFetcher(entry.student))
            //         homeworkFetcher(data.data[0].student)
            //     }, 120)
            // })
        },
        handleModuleChange: () => { },
        handleStatusChange: () => { },
        handleReceivePeerReviewChange: () => { },
        // classNumber: newQuery.classNumber || "",
        // module: query.module || "",
        // showPeerReviewStatus: "",
        // status: "",
        renderExplainer: () => (
            <Explainer />
        )
    }
    const listHomework = (student) => {
        if (isLoadingHomework) return (<h2 style={{ marginLeft: "1em", opacity: 0.6 }}>🚀 Fetching data from Github...</h2>)
        // return JSON.stringify([query.student, )
        if (homework[student]) {
            return (
                <StudentHomework key={query.student} query={query} homework={homework[query.student]} student={query.student}></StudentHomework>
            )
        }
        return "Henter..."
        //         isLoadingHomework ? ("Fetching homework") : homework[query.student || students.data[0]] && (
        //             <StudentHomework query={query} homework={homework[query.student]} student={query.student}></StudentHomework>
        // )
    }

    return (
        <Frontpage renderSearch={<Search {...searchProps} />} />

    )
    return (
        <main className="homeworker">
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
            {/* <header>
                <Search {...searchProps} />
            </header> */}
            <section className="homeworker-wrap">
                {/* <pre>
                {JSON.stringify(query,null,2)}
                </pre> */}
                {
                    query.student && students && Array.isArray(students.data) ? (
                        <Results renderSearch={<Search {...searchProps} />} homework={homework} homeworkFetcher={homeworkFetcher} query={query} setQuery={(q) => {
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
                                    }, 100)
                                }
                            }
                        }} results={students.data} renderHomework={listHomework}></Results>
                    ) : (
                        // <section style={{ backgroundImage: "url('https://www.hackyourfuture.dk/static/logo-round.svg')", backgroundRepeat: "no-repeat", backgroundSize: "20%", backgroundPosition: "50em center" }}>
                        //     <Search {...searchProps} />
                        //     <aside style={{ maxWidth: "220px" }}><h2>Select a class</h2><p>Use the dropdown above to select a class and optionally a filter</p></aside>
                        //     <img src="https://cdn0.iconfinder.com/data/icons/education-935/200/online-learning-512.png" />
                        //     {/* <article className="explanation"><Explainer /></article> */}
                        // </section>
                        <Frontpage renderSearch={<Search {...searchProps} />} />
                    )
                }
            </section>
        </main>
    )
}