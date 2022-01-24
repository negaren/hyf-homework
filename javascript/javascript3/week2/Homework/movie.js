let voteArr = [];
let minVote = 0;
let maxVote = 0;
let badMoviesArr = [];
let badMoviesSinceYearArr = [];
fetch('https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json')
.then(response => response.json())
.then(data => {
    for (voteVal of data){
        voteArr.push(voteVal.votes)
    }
    console.log(data);
    minVote = Math.min.apply(null, voteArr);
    maxVote = Math.max.apply(null ,voteArr);
    const avgVote = (minVote + maxVote)/2;
    badMoviesArr = data.map(voteValue => {
        if(voteValue.votes < avgVote){
            return voteValue.title
        }
    })
    // for (voteValue of data){
    //     if (voteValue.votes < avgVote){
    //         badMoviesArr.push(voteValue.title);
    //     }
    // }
    console.log(`The list of Bad movies: ${badMoviesArr}`);
    badMoviesSinceYearArr = data.map(value => {
        if (value.votes < avgVote && value.year <= 2000){
            return value.title
        }
    })
    // for (Value of data){
    //     if (Value.votes < avgVote && Value.year <= 2000){
    //         badMoviesSinceYearArr.push(Value.title)
    //     }
    // }
    console.log(`The list of Bad movies since year 2000 is: ${badMoviesSinceYearArr}`);
})