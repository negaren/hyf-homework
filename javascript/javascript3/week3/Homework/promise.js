fetch('https://api.github.com/search/repositories?q=user:benna100')
    .then(response => {
        response.json().then(data => {
            console.log(data.items);

        })
    })
async function fetchRepo(userName) {
    return fetch(`https://api.github.com/search/repositories?q=user:${userName}`)

}
// async function fetchRepo2() {
//     await fetchRepo3()
//     return  fetch('https://api.github.com/search/repositories?q=user:mariem460')
//         .then(response => {
//             response.json().then(data => {
//                  data.items;
//             })
//         })
// }


// async function fetchRepo1() {
//     await fetchRepo2()
//     return  fetch('https://api.github.com/search/repositories?q=user:QaisSaada')
//         .then(response => {
//             response.json().then(data => {
//                  data.items;
//             })
//         })
// }
// const user1 = 'mariem460'
// fetchRepo(user1)
// .then(response => {
//     response.json().then(data => {
//          console.log(data.items);
//     })
// })
const text1 = 'Repo full-name:';
const text1Bold = text1.bold();
const text2 = 'URL:';
const text2Bold = text2.bold();
const text3 = 'Owner-ID:';
const text3Bold = text3.bold();
Promise.all([fetchRepo('Vahablotfi'), fetchRepo('mariem460'), fetchRepo('QaisSaada')])
    .then(response => {
        for (mem of response) {
            mem.json()
                .then(data => {
                    for (mem1 of data.items) {
                        document.createElement('div');
                        const UserDiv1 = document.querySelector('div');
                        const UserDiv = UserDiv1.appendChild(document.createElement('div'));
                        const userRepoElement = document.createElement('li');
                        UserDiv.appendChild(userRepoElement).innerHTML = `${text1Bold} ${mem1.full_name}`;
                        UserDiv.appendChild(document.createElement('li')).innerHTML = `${text2Bold} ${mem1.url}`;
                        UserDiv.appendChild(document.createElement('li')).innerHTML = `${text3Bold} ${mem1.owner.id}`;

                    }
                })
        }
    })



