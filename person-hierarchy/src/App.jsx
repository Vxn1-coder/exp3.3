import { useState } from 'react';

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  getInfo() {
    return `${this.name}, ${this.age} years old`;
  }
  
  introduce() {
    return `Hi, I'm ${this.name}`;
  }
}

class Student extends Person {
  constructor(name, age, studentId, major) {
    super(name, age);
    this.studentId = studentId;
    this.major = major;
  }
  
  getInfo() {
    return `${super.getInfo()}, Student ID: ${this.studentId}, Major: ${this.major}`;
  }
  
  introduce() {
    return `${super.introduce()}, a ${this.major} student`;
  }
}

class Teacher extends Person {
  constructor(name, age, employeeId, department) {
    super(name, age);
    this.employeeId = employeeId;
    this.department = department;
  }
  
  getInfo() {
    return `${super.getInfo()}, Employee ID: ${this.employeeId}, Dept: ${this.department}`;
  }
  
  introduce() {
    return `${super.introduce()}, your ${this.department} teacher`;
  }
}

function App() {
  const [people, setPeople] = useState([
    new Student('Alice Johnson', 20, 'STU001', 'Computer Science'),
    new Teacher('Dr. Smith', 45, 'EMP101', 'Mathematics'),
    new Student('Bob Wilson', 22, 'STU002', 'Physics'),
    new Teacher('Prof. Lee', 38, 'EMP102', 'Computer Science')
  ]);

  const addRandomPerson = () => {
    const types = ['Student', 'Teacher'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    if (type === 'Student') {
      setPeople([...people, new Student(
        `Student ${people.length + 1}`, 
        18 + Math.floor(Math.random() * 5),
        `STU${String(people.length + 1).padStart(3, '0')}`,
        ['CS', 'Physics', 'Math'][Math.floor(Math.random() * 3)]
      )]);
    } else {
      setPeople([...people, new Teacher(
        `Teacher ${people.length + 1}`,
        30 + Math.floor(Math.random() * 15),
        `EMP${String(people.length + 1).padStart(3, '0')}`,
        ['CS', 'Math', 'English'][Math.floor(Math.random() * 3)]
      )]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-8 text-center">
          Person Class Hierarchy
        </h1>
        
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 mb-8 border border-white/50">
          <button
            onClick={addRandomPerson}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:from-purple-600 hover:to-indigo-700 transition-all text-lg"
          >
            Add Random Person
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Demonstrates inheritance, method overriding, and polymorphism
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {people.map((person, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 hover:shadow-3xl transition-all hover:-translate-y-2 group">
              <div className={`w-12 h-12 rounded-2xl mb-4 flex items-center justify-center text-white font-bold text-lg ${
                person instanceof Student 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}>
                {person instanceof Student ? 'S' : 'T'}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                {person.name}
              </h2>
              
              <p className="text-lg text-gray-600 mb-4 bg-gray-50 p-3 rounded-xl">
                {person.getInfo()}
              </p>
              
              <blockquote className="text-indigo-600 font-semibold italic bg-indigo-50 p-3 rounded-xl border-l-4 border-indigo-400">
                "{person.introduce()}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
