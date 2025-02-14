import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { section_services } from "./section_header.service";


// home_services.controller.ts - home_services module
const admin_post_section_header = catchAsync(
  async (req, res) => {
    const { title, heading, ctaText, ctaLink } = req.body;
    const result = await section_services.admin_post_section_header_into_db({
      title,
      heading,
      ctaText,
      ctaLink,
    });

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Section header is saved successfully.",
      data: result,
    });
  }
);
const admin_put_section_header = catchAsync(
  async (req, res) => {

    const { title, heading, ctaText, ctaLink } = req.body;
    const { id } = req.params;


  

    const result = await section_services.admin_put_section_header_into_db({ id,
      title,
      heading,
      ctaText,
      ctaLink,
    });

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Section header is edited successfully.",
      data: result,
    });
  }
);

const admin_delete_section_header = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = section_services.admin_delete_section_header_into_db(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Section header is deleted successfully",
    data: result,
  });
});
const admin_get_section_header = catchAsync(async (req, res) => {
  const result = await section_services.admin_get_section_header_into_db(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Section header get successfully",
    data: result,
  });
});

export const sectionHeaderController = {
 admin_delete_section_header,
 admin_get_section_header,
 admin_post_section_header,
 admin_put_section_header
};
