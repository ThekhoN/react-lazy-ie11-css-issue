const Enzyme = require("enzyme");
const EnzymeAdapter = require("enzyme-adapter-react-16");
import "raf/polyfill";

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });
