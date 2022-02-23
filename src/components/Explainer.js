export default function Explainer() {
    return (
        <article>
                <h2>Homework Assetment Tool</h2>

            <span>So what does the different statuses mean?</span>
            <ul>
              <li>
                <strong>Needs mentor feedback: </strong>
                The student has made a PR and is waiting on feedback from a
                mentor
              </li>
              <li>
                <strong>
                  Feedback received (student should implement feedback)
                </strong>
                The student has gotten a review on the PR and has to now make a
                commit with the changes suggested by a mentor
              </li>
              <li>
                <strong>Feedback implemented (PR ready to be merged):</strong>
                There has been a review from a mentor and the student has made a
                commit after the review was given. The PR is ready to merge
              </li>
              <li>
                <strong>PR has been merged: </strong>
                There are files in the folder the student is working in (Which
                we assume means that the student has merged the files through a
                PR)
              </li>
            </ul>
            <span>
              There are folder that both has merged, approved and
              needs-feedback, why is that? This is because there are students
              that in a folder (fx databases/week1) both has files in the folder
              and has made a PR with files that go into the same databases/week1
              folder. There can be multiple PR's to one folder. Off couse there
              shouldnt but there can be.
            </span>
            <br />
            <br />
            <span>
              If you find any bugs, please write to benjamin on slack. There is
              one error i know of.
            </span>
            <br />
            <br />
          </article>
        
    )
}