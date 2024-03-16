import { Schema, model, models } from "mongoose";
import type { School } from "@/types/modelType/school";

const schoolSchema = new Schema<School>({
    school_name: {
        type: String,
        required: true,
    },
    school_remark: {
        type: String,
        required: false,
        default: ""
    }
}, { timestamps: true });

const SchoolModel = models.School || model<School>("School", schoolSchema);

export default SchoolModel;