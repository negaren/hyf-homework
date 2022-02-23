import React from "react"
import Image from "next/image"
import ICON_link from "../public/link-icon.svg"

function matchModule(queryModule, homeworkFolder) {
    if (queryModule.includes("javascript")) {
        return !homeworkFolder.split("/").includes(queryModule.replace("-", ""))
    }
    return !homeworkFolder.split("/").includes(queryModule)
}
function matchStatus(queryStatus, pr) {
    if (!pr) return false
    return pr.status === queryStatus
}
function matchWeek(queryWeek, homeworkFolder) {
    // if (queryWeek.includes(queryWeek)) {
    //     return !homeworkFolder.split("/").includes(queryWeek.replace("-", ""))
    // }
    return !homeworkFolder.includes(queryWeek)
}

function filterByQuery(query, homework) {
    const filter = []
    if (query && query.module) {
        filter.push((homeworkWeek) => matchModule(query.module, homeworkWeek.homeworkFolder))
    }
    if (query && query.status) {
        filter.push((homeworkWeek) => matchStatus(query.status, homeworkWeek.pr))
    }
    if (query && query.week) {
        filter.push((homeworkWeek) => matchWeek(query.week, homeworkWeek.homeworkFolder))
    }

    if (filter.length === 0) return false
    return filter.every((youShallNotPass) => youShallNotPass(homework))
}

function HumanRedableStatus(status, render) {
    if (status === "approved") {
        return render("orange", "Feedback implemented (PR ready to be merged)");
    } else if (status === "merged") {
        return render("green", "PR has been merged");
    } else if (status === "missing") {
        return render("red", "No homework found");
    } else if (status === "implement-feedback") {
        return render("yellow", "Feedback received awaiting student") //(student should implement feedback)
    } else if (status === "needs-feedback") {
        return render("red", "Needs mentor feedback")
    }

    return status;
}

function StudentsInSidebar(props) {
    return (
        <aside>
            {
                props.renderSearch
            }
            <h4 className="font-space-mono" style={{ fontSize: "0.8rem", borderBottom: "1px solid #ccc", paddingBottom: "0.6em" }}>Students</h4>
            {
                Array.isArray(props.results) && props.results.map(({ student }) => (
                    <h3 onClick={() => Object.keys(props.query).length > 0 && props.query.student === student ? props.setQuery({ "student": "remove" }) : props.setQuery({ "student": student })} className="font-space-mono" style={{ textDecoration: Object.keys(props.query).length > 0 && props.query.student === student ? "underline" : "", fontSize: "1rem" }}>{student} ➔</h3>
                ))}<a href={`/class-status/${props.classNumber}`} target="_blank"><h3 style={{ fontWeight: 400, fontSize: "1rem", margin: "0 0 2em 0" }}>See Class Stats</h3></a></aside>
    )
}

function TableDivider(props) {
    const isFirst = props.prev && props.prev.split("/")[0] !== props.current.split("/")[0]
    if (!isFirst) return null
    return (
        <h2 style={{ marginLeft: "1em" }}>{props.current.split("/")[0]}</h2>
    )
}


function PRStatus(props) {
    if (! props.pr) {
        return (
            <div className="tag tag-red tag-round">PR missing</div>
        )
    }
    else if (Array.isArray(props.pr)) {
        const mergedPR = props.pr.find((p) => p.status === "merged")
        if (mergedPR) {
            return (
                HumanRedableStatus(mergedPR.status, (tagName, tag) => (
                    <div className={"tag tag-round tag-" + tagName}>{tag}</div>
                ))
            )
        }
        return (<div className="tag tag-red tag-round">Found multiple non merged PRs</div>)
    } else {
        return (
            HumanRedableStatus(props.pr.status, (tagName, tag) => (
                <div className={"tag tag-round tag-" + tagName}>{tag}</div>
            ))
        )
    }
}
function PRLink(props) {
    if (! props.pr) {
        return (
            <div className="tag tag-round tag-red">No PR found</div>
        )
    }
    else if (Array.isArray(props.pr)) {
        const mergedPR = props.pr.find((p) => p.status === "merged")
        if (mergedPR) {
            return (
                <a target="_blank" href={mergedPR.link}>
                    <div className="tag tag-link">
                        <Image src={ICON_link} width="14" height="14" />{" "}
                        Go to PR</div>
                </a>
            )
        }
        return props.pr.map((prLink, i) => {
            const PRnumber = ""+prLink.link.split("/").pop()
            return (<div className="tag tag-link" key={i}><a href={prLink.link} target="_blank">PR #{PRnumber}</a></div>)
        })
    } else {
        return (
            <a target="_blank" href={props.pr.link}>
                <div className="tag tag-link">
                    <Image src={ICON_link} width="14" height="14" />{"  "}

                    Go to PR</div>
            </a>
        )
    }
}


export function StudentHomework(props) {
    const student = props.student
    const i = 1
    const homeworkWeeks = props.homework

    const filteredHomework = (homeworkWeek) => {
        const filter = {}
        if (props.moduleName) {
            filter["module"] = props.moduleName
        }
        if (props.weekNumber) {
            filter["week"] = props.weekNumber
        }
        return filterByQuery(filter, homeworkWeek)
        // if (props.moduleName) {

        // }

        // Object.keys(props.query).length > 0 && filterByQuery(props.query, homeworkWeek)
    }

    if (!homeworkWeeks) return null
    return (
        <>
            <tr>
                {(() => {
                    if (props.moduleName) return null
                    if (!homeworkWeeks) return null
                    // return null
                    const missing = homeworkWeeks.reduce((count, homeworkWeek) => {
                        if (!homeworkWeek.pr) {
                            return count + 1
                        }
                        return count
                    }, 0) 
                    //- 3 // no PRs for HTML and CSS
                    const latestPR = homeworkWeeks.map((h) => h).reverse().find((homeworkWeek) => {
                        if (homeworkWeek.homeworkFolder && homeworkWeek.homeworkFolder.includes("html")) {
                            return false
                        }
                        else if (!homeworkWeek.pr) {
                            return false
                        }
                        return true
                    })
                    return (
                        <div className="stats-box">
                            <div>
                                <h4 style={{ fontWeight: "400" }}>🔥 Latest PR [<span style={{ fontWeight: 800 }}>{latestPR && latestPR.homeworkFolder}</span>]</h4>

                            </div>
                            <div>
                                <h4 style={{ fontWeight: "400" }}>🚀 Missing <span style={{ fontWeight: 800 }}>{missing} of {homeworkWeeks.length}</span> Homework deliveries</h4>

                            </div>
                        </div>
                    )
                })()}
            </tr>

            <tr key={i + "b"}>
                <td>
                    <table>
                        <thead className="table-header">
                            <td>Homework folder</td>
                            <td>Status</td>
                            <td>Link to pr</td>
                            {/* <td>feedback</td> */}
                        </thead>
                        {homeworkWeeks && homeworkWeeks.map((homeworkWeek, i) => filteredHomework(homeworkWeek) ? null : (
                            <>
                                <tr key={i + "header"}>
                                    <TableDivider current={homeworkWeek.homeworkFolder} prev={i === 0 ? "" : i > 0 && homeworkWeeks[i - 1] && homeworkWeeks[i - 1].homeworkFolder} />
                                    {/* {JSON.stringify(homeworkWeek.homeworkFolder)} */}
                                </tr>
                                <tr
                                    key={i}
                                    className={
                                        homeworkWeek.pr ? homeworkWeek.pr.status : "no-status"
                                    }
                                >
                                    {/* {JSON.stringify(homeworkWeek)} */}
                                    <td>

                                        <a target="_blank" alt={homeworkWeek.homeworkFolder} href={homeworkWeek.filesLink}>
                                            <div className="tag tag-black">
                                                <Image src={ICON_link} width="14" height="14" />{"  "}
                                                {`${homeworkWeek.homeworkFolder}`}
                                            </div>
                                        </a>
                                    </td>
                                    <td>
                                        {/* {
                                            homeworkWeek.pr
                                                ? HumanRedableStatus(homeworkWeek.pr.status, (tagName, tag) => (
                                                    <div className={"tag tag-round tag-" + tagName}>{tag}</div>
                                                ))
                                                : homeworkWeek.homeworkFolder.includes("html") ? "—" : (
                                                    <div className="tag tag-red tag-round">PR missing</div>
                                                )
                                        } */}
                                        <PRStatus pr={homeworkWeek.pr} />
                                        {/* <span className="status">
                                                    {`${homeworkWeek.pr
                                                            ? "" //this.getReadableStatus(homeworkWeek.pr.status)
                                                            : 
                                                        }`}
                                                </span> */}
                                    </td>

                                    <td>
                                        <PRLink pr={homeworkWeek.pr} />
                                        {/* {homeworkWeek.pr ? (
                                            <a target="_blank" href={homeworkWeek.pr.link}>
                                                <div className="tag tag-green">
                                                    <Image src={ICON_link} width="14" height="14" />{"  "}

                                                    Open PR</div>
                                            </a>
                                        ) : homeworkWeek.homeworkFolder.includes("html") ? "—" : (
                                            <div className="tag tag-round tag-red">No PR found</div>
                                        )} */}

                                    </td>
                                    {/* <td>
                                    {homeworkWeek.pr ? (
                                        <span>
                                            {
                                                homeworkWeek.pr.peerReviewStatus && homeworkWeek.pr.peerReviewStatus
                                                    .classmatesToReceiveFeedbackFrom
                                            }{" "}
                                            {homeworkWeek.pr.peerReviewStatus && homeworkWeek.pr.peerReviewStatus
                                                .hasReceivedFeedback
                                                ? "has given"
                                                : "needs to give"}{" "}
                                            feedback
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </td> */}
                                </tr>
                            </>
                        ))}
                    </table>
                </td>
            </tr>
        </>
    )
}

export default function Results(props) {

    const showStudent = (student) => {
        Object.keys(props.query).length > 0 && props.query.student === student ? props.setQuery({ "student": "remove" }) : props.setQuery({ "student": student })
    }

    return (
        <>

            <StudentsInSidebar {...props} />
            {
                !props.query.student && (
                    <h2 className="font-space-mono" style={{ color: "black", fontSize: "1rem", padding: "0.5em", textAlign: "center", backgroundColor: "#ccc", borderRadius: "4px" }}>Select a student to see the homework</h2>
                )
            }
            <table className="styled-table">

                {/* <tbody> */}
                {Array.isArray(props.results) && props.results.map(({ student }, i) => props.query && props.query.student && props.query.student !== student ? null : (
                    <tbody key={i}>
                        {
                            Object.keys(props.query).length === 0 || props.query && !props.query.module ? (
                                <tr key={i + "a"} onClick={() => showStudent(student)} className="font-space-mono">
                                    <td><div className="student-github-profile"><img src={`https://github.com/${student}.png`} /></div><h3 className="font-space-mono" style={{ fontSize: "2rem", margin: "0.66em  0 1em 3.5em" }}>{student}</h3>
                                        <div className="student-git-graphs">
                                            <img src={`https://ghchart.rshah.org/${student}`} style={{ width: "calc(100% - 390px)", }}
                                            /><img src={`https://github-readme-stats.vercel.app/api?username=${student}&show_icons=true&theme=default&hide_title=true&hide_rank=true`} style={{ width: "320px", marginTop: "0.5em", float: "right" }} /></div></td>

                                </tr>
                            ) : (
                                <tr key={i + "a"} onClick={() => showStudent(student)}>
                                    <td><div className="student-github-profile" style={{ width: "40px", height: "40px" }}><img src={`https://github.com/${student}.png`} /></div><h3 className="font-space-mono" style={{ fontSize: "1.2rem", margin: "0.5em  0 1em 4em" }}>{student}</h3>
                                    </td>

                                </tr>
                            )
                        }
                        {/* {JSON.stringify(props.homework)} */}
                        {/* <FetchHomework student={student} homeworkFetcher={props.homeworkFetcher}> */}
                        {props.renderHomework(student)}
                        {/* </FetchHomework> */}
                    </tbody>
                ))}
                {/* </tbody> */}
            </table>
        </>
    )
}