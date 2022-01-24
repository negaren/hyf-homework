class UserInfo {
    constructor(firstName, lastName){
        this.firstName = firstName
        this.lastName = lastName
    }
    getFullName(){
        return `user name is: ${this.firstName} ${this.lastName} `
    }
}

const user1 = new UserInfo('Negar', 'Eghbali')
console.log(user1);
console.log(user1.firstName);
console.log(user1.getFullName());

// CV
//part1
class CV {
    constructor(email) {
      this.jobs = [];
      this.educations = [];
      this.educationsS = [];
      this.email = email;
    }
  
    addJob(job) {  
        this.jobs.push(job);
        return this.jobs;
    }
  
    removeJob(job) {
      // add functionality here
    }
  
    addEducation(education) {
      this.educations.push(education);
      return this.educations;
    }
  
    removeEducation(education) {
      const educationsS2 = this.educations.map(items => {
          if (items.id !== education.id){
            this.educationsS.push(items)
          }
      })
      return this.educationsS
     
    }
  }

  class Job {
      constructor(id, title, description, startDate, endDate){
          this.id=id
          this.title=title
          this.description=description
          this.startDate=startDate
          this.endDate=endDate
      }
 }
 
 class Education {
     constructor (id, title, school, address, startDate, endDate){
        this.id=id
        this.title=title
        this.school=school
        this.address=address
        this.startDate=startDate
        this.endDate=endDate
     }
 }
 const cv1 = new CV ('negaren@gmail.com')
 const jobDetails = new Job('1234', 'PM', 'Leadin the project', '2019', '2022')
 const educationDetails = new Education('1234', 'MBA', 'Master of business administration','FMU', 'Iran', '2012', '2014')
 const educationDetails1 = new Education('3456', 'BSc', 'Computer Science', 'Azad', 'Iran', '2005', '2009')
 console.log(cv1.addEducation(educationDetails));
 cv1.addEducation(educationDetails1);
 console.log(cv1.removeEducation(educationDetails1));

 //Part 3:

 

// const bodyElement= document.querySelector('body')
// const firstNameInputElement= document.getElementById('firstName')
// const dobInputElement= document.getElementById('dob')
// const buttonElement= document.querySelector('button')
// const divElement= document.createElement('div')


// class Person{
//     constructor(firstName, dob){
//         this.firstName= firstName;
//         this.dob= dob;

//     }

//     computeAge(){
//         return 2020-this.dob
//     }

//     renderPersonInfo(){
//         divElement.innerHTML= `First Name: ${this.firstName} Dob: ${this.dob}`
//         const newElement = document.createElement('div')
//         newElement.innerHTML= `First Name: ${this.firstName} Dob: ${this.dob}`
//         bodyElement.append(newElement)


//     }

//     editPersonInfo(){

//     }
// }

// const pr= new Person('one',1990)


// buttonElement.addEventListener('click', ()=>{
//     const person= new Person(firstNameInputElement.value,dobInputElement.value)
//     person.renderPersonInfo()
//     firstNameInputElement.value=""
//     dobInputElement.value=""
// })