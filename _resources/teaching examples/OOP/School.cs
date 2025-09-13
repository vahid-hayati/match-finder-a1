using backend.OOP;

namespace OOP
{
    public class School
    {
        // Student student1 = new Student("Vahid Hayati");

        public School()
        {
            Student student = new Student();
            PrintStudetName();
        }

        public void PrintStudetName()
        {
            Student student1 = new Student("Vahid Hami");
            Student student2 = new Student("Parsa Porgoo");
            Student student3 = new("Faranak Supervisor");
            Student student4 = new("Hamid Dirbia");

            student1.PrintName();
            student2.PrintName();
            student2.PrintName();
            student2.PrintName();
            student3.PrintName();
            student4.PrintName();
            student3.PrintName();
        }
    }
}