namespace backend.OOP
{
    public class Student
    {
        private readonly string _name;

        public Student() // parameterless
        {
            Console.WriteLine("Class has started!");
            _name = "";
        }

        public Student(string name) // parameter
        {
            _name = name;
        }

        public void PrintName()
        {
            Console.WriteLine(_name.ToUpper());
        }
    }
}











// private readonly string _name;

// public void PrintName()
// {
//     Console.WriteLine(_name);
// }