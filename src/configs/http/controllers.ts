import path from "path";
import requireAll from "../../utils/require-all";

export const registerController = () => {
	requireAll(path.join(__dirname, "../../controllers"));
};
