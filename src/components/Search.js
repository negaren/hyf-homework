import Select from 'react-select'
import React from 'react'
import { useRouter } from "next/router"
function createClassRange(offset) {
    return Array.from(Array(10).keys()).map((classNumber) => offset + classNumber)
}

const MODULES = [
    // { value: "remove", label: "Remove filter" },
    { value: "html-css", label: "Html/css" },
    { value: "git", label: "Git" },
    { value: "javascript-1", label: "Javascript 1" },
    { value: "javascript-2", label: "Javascript 2" },
    { value: "javascript-3", label: "Javascript 3" },
    { value: "databases", label: "Databases" },
    { value: "nodejs", label: "Node js" },
    { value: "react", label: "React" },
]
export const getHomeworkFolders = [
    // "html-css/week1",
    // "html-css/week2",
    // "html-css/week3",
    "git/week1",
    "javascript/javascript1/week1",
    "javascript/javascript1/week2",
    "javascript/javascript1/week3",
    "javascript/javascript1/week4",
    "javascript/javascript2/week1",
    "javascript/javascript2/week2",
    "javascript/javascript2/week3",
    "javascript/javascript3/week1",
    "javascript/javascript3/week2",
    "javascript/javascript3/week3",
    "databases/week1",
    "databases/week2",
    "databases/week3",
    "nodejs/week1",
    "nodejs/week2",
    "nodejs/week3",
    "react/week1",
    "react/week2",
    "react/week3",
    "react/week4",
    "react/week5",
    "git/week2",
];
const STATUS = [
    { value: "remove", label: "Remove filter" },
    { value: "needs-feedback", label: "Needs mentor feedback" },
    { value: "implement-feedback", label: " Feedback received (student should implement feedback" },
    { value: "approved", label: "Feedback implemented (PR ready to be merged" },
    { value: "merged", label: "PR has been merged" },
    { value: "missing", label: "No homework found" },
    { value: "peer-review", label: "Show peer review feedback status" }
]

export default function Search({
    handleChange,
    handleSubmit,
    classNumber,
    moduleName,
    keepInternalState,
    module,
    handleModuleChange,
    showPeerReviewStatus,
    handleReceivePeerReviewChange,
    renderExplainer,
    handleStatusChange,
    status }) {

    const [showExplainer, setShowExplainer] = React.useState(false)
    const router = useRouter()

    return (
        <section className="xsearch-box">
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}>
                <div>
                    {/* <label htmlFor="class">Select a class</label> */}
                    <Select styles={{
                        // Fixes the overlapping problem of the component
                        menu: provided => ({ ...provided, zIndex: 9999 })
                    }} placeholder="Select a class"
                        {...(classNumber ? { defaultValue: { value: classNumber, label: `Class ${classNumber}` } } : {})}
                        style={{ width: "250px" }}
                        onChange={(opt) => handleChange("classNumber", opt.value)}
                        options={createClassRange(18).map((theClassNumber,) => ({
                            value: theClassNumber,
                            label: "Class " + theClassNumber
                        }))}>

                    </Select>
                </div>



                {(keepInternalState || classNumber) && (
                    <div>
                        <Select styles={{
                            // Fixes the overlapping problem of the component
                            menu: provided => ({ ...provided, zIndex: 9999 })
                        }}
                            placeholder="Select a module"
                            onChange={(opt) => handleChange("module", opt.value)}
                            options={MODULES}
                            {...(moduleName ? { defaultValue: { value: moduleName, label: `${moduleName}` } } : {})}

                        ></Select>
                    </div>
                )}


                {
                    false && moduleName && (
                        <div>
                            <Select styles={{
                                // Fixes the overlapping problem of the component
                                menu: provided => ({ ...provided, zIndex: 9999 })
                            }} placeholder="Filter by week" onChange={(opt) => handleChange("week", opt.value.split("/").pop())} options={getHomeworkFolders.filter((folder) => {
                                // console.log(folder, query.module.replace("-", ""), query.module.replace("-", "").includes(folder))
                                if (folder.includes(moduleName.replace("-", ""))) {
                                    return true
                                }
                                if (folder.includes(moduleName)) {
                                    return true
                                }
                                return false
                            }).map((folder) => ({ label: folder.split("/").pop(), value: folder }))}></Select>
                        </div>

                    )
                }


                <div style={{ margin: "1em 0" }}>
                    <button style={{ padding: "0.66em 1em", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "3px" }}>Search</button>
                    {/* <button onClick={(e) => {
                        e.preventDefault()
                        setShowExplainer(! showExplainer)
                    }} style={{ padding: "0.66em 1em", backgroundColor: "#ccc", color: "#000", border: "none", borderRadius: "3px", marginLeft: "0.66em" }}>Help</button> */}
                </div>



                {
                    showExplainer && (
                        <div>{renderExplainer()}</div>
                    )
                }
            </form>
        </section>
    )
}