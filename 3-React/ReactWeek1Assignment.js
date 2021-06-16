class Students{
    constructor(name,email,community){
        this.name=name;
        this.email=email;
        this.community=community;

    }

}
class Bootcamp{
    constructor(name,level,students=[]){
        this.name=name;
        this.level=level;
        this.students=students;

    }
   registerStudent(studentToRegister){
        if(this.students.map(student=>student.email).includes(studentToRegister.email)){
            console.log(`The student ${studentToRegister.email} already register to the Bootcamp.`);
        }
        else{
            
            this.students.push(studentToRegister);
            console.log(`Registering student ${studentToRegister.email} to the BOOTCAMP ${this.name}! `);

        }
        return this.students;

    }
}
