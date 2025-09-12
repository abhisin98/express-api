import { Request, Response } from "express";

type IData = {
  id: string | number;
  name: string;
};
const data = [
  { id: 1, name: "example data 1" },
  { id: 2, name: "example data 2" },
] satisfies IData[];

// --------------------------------------------------------------------
export function GET(req: Request, res: Response) {
  // Allow only GET requests
  if (req.method !== "GET") {
    res.status(405).json({
      error: "Method Not Allowed",
      message: "Only GET requests are allowed.",
    });
    return;
  }

  try {
    // Check if data exists before responding
    if (!Array.isArray(data) || data.length === 0) {
      res.status(404).json({
        error: "Not Found",
        message: "No data available.",
      });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}

// --------------------------------------------------------------------
export function POST(req: Request, res: Response) {
  // Allow only POST requests
  if (req.method !== "POST") {
    res.status(405).json({
      error: "Method Not Allowed",
      message: "Only POST requests are allowed.",
    });
    return;
  }

  const { name } = req.body as IData;

  try {
    // Check if name input is valid
    if (!name || name.trim().length === 0) {
      res.status(400).json({
        error: "Bad Request",
        message: "Invalid input data. Please provide a valid name.",
      });
      return;
    }

    // Add new data
    const id = data.length + 1;
    data.push({ id, name });

    res
      .status(201)
      .json({ id, message: "Your data has been submitted successfully." });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}

// --------------------------------------------------------------------
export function PUT(req: Request, res: Response) {
  // Allow only PUT requests
  if (req.method !== "PUT") {
    res.status(405).json({
      error: "Method Not Allowed",
      message: "Only PUT requests are allowed.",
    });
    return;
  }

  const { id, name } = req.body as IData;

  try {
    // Validate input
    if (!id || !name || name.trim().length === 0) {
      res.status(400).json({
        error: "Bad Request",
        message: "Invalid input data. Please provide a valid id and name.",
      });
      return;
    }

    // Find and update data
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
      res.status(404).json({
        error: "Not Found",
        message: "Data with the specified ID not found.",
      });
      return;
    }

    data[index].name = name;

    res
      .status(200)
      .json({ id, message: "Your data has been updated successfully." });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}

// --------------------------------------------------------------------
export function DELETE(req: Request, res: Response) {
  // Allow only DELETE requests
  if (req.method !== "DELETE") {
    res.status(405).json({
      error: "Method Not Allowed",
      message: "Only DELETE requests are allowed.",
    });
    return;
  }

  const { id } = req.body as { id: string | number };

  try {
    // Validate input
    if (!id) {
      res.status(400).json({
        error: "Bad Request",
        message: "Invalid input data. Please provide a valid ID.",
      });
      return;
    }

    // Find and delete data
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
      res.status(404).json({
        error: "Not Found",
        message: "Data with the specified ID not found.",
      });
      return;
    }

    data.splice(index, 1);

    res
      .status(200)
      .json({ id, message: "Your data has been deleted successfully." });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}
