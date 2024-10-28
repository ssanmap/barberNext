import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../src/infrastructure/database";
import Professional from "../../../../src/domain/models/Professional";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const updatedProfessional = await Professional.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedProfessional) return res.status(404).json({ message: "Professional not found" });
      res.status(200).json(updatedProfessional);
    } catch (error) {
      res.status(500).json({ message: "Error updating professional" });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
