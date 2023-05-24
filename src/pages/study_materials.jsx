import React from "react"
import StudyMaterial from "../components/study_materials/index.jsx"
import LoginCheck from "../sharedComponet/LoginCheck"

function StudyMaterials() {
    return <StudyMaterial />
}

export default LoginCheck(StudyMaterials)
