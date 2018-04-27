namespace StoreMe.APIs.Controllers
{
    using DBContext;
    using Filters;
    using Models;
    using Services;
    using Swashbuckle.Swagger.Annotations;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using System.Web.Http;

    [RoutePrefix("api/Notes")]
    public class NotesController : ApiController
    {
        private readonly INotesService _notesService;

        public NotesController(INotesService notesService)
        {
            this._notesService = notesService;
        }

        [HttpGet, Route("get/{searchQuery?}")]
        [SwaggerOperation("Get")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> Get(string searchQuery = null)
        {
            return Ok(await _notesService.Get(searchQuery));
        }

        [HttpPost, Route("create")]
        [SwaggerOperation("Create")]
        [SwaggerResponse(HttpStatusCode.Created)]
        public async Task<IHttpActionResult> Post([FromBody]Note note)
        {
            if (null == note)
            {
                return BadRequest(string.Format(CommonConstants.Messages.MandetoryFieldValidationFailed, "Note"));
            }
            if (string.IsNullOrEmpty(note.Title))
            {
                return BadRequest(string.Format(CommonConstants.Messages.MandetoryFieldValidationFailed, "Title"));
            }
            if (string.IsNullOrEmpty(note.Description))
            {
                return BadRequest(string.Format(CommonConstants.Messages.MandetoryFieldValidationFailed, "Description"));
            }
            if (string.IsNullOrEmpty(note.Tags) || note.Tags.Equals("[]"))
            {
                return BadRequest(string.Format(CommonConstants.Messages.MandetoryFieldValidationFailed, "Tags"));
            }

            return Ok(await _notesService.Create(note));
        }

        [HttpDelete, Route("delete/{guid}")]
        [SwaggerOperation("Delete")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.Unauthorized)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> Delete(string guid)
        {
            return Ok(await _notesService.Delete(guid));
        }
    }
}