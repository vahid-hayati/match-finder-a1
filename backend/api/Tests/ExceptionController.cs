namespace api.Tests;

[ApiController]
[Route("api/[controller]")]
public class ExceptionController : BaseApiController
{
    [HttpPost("divide/{num}")]
    public ActionResult<int> ExceptionTest(int num)
    {
        int result = num / 0;

        return result;
    }

    [HttpPost("get-length")]
    public ActionResult GetLength()
    {
        string name = null;

        int length = name.Length; //toLower()

        return Ok("DONE");
    }
}
