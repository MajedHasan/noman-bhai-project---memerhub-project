import mongoose from "mongoose"

const SiteTextSchema = mongoose.Schema({
    homePageText1: String,
    homePageText2: String,
    homePageText3: String,
    homePageText4: String,
    tier1Heading: String,
    tier1Subheading: String,
    tier2Heading: String,
    tier2Subheading: String,
    tier3Heading: String,
    tier3Subheading: String,
    tier4Heading: String,
    tier4Subheading: String,
    tier5Heading: String,
    tier5Subheading: String,
    tier1PageHeading: String,
    tier1PageSubheading: String,
    tier2PageHeading: String,
    tier2PageSubheading: String,
    tier3PageHeading: String,
    tier3PageSubheading: String,
    tier4PageHeading: String,
    tier4PageSubheading: String,
    tier5PageHeading: String,
    tier5PageSubheading: String,
    tierPageText1: String,
    tierPageText2: String,
    tierPageText3: String,
    tierPageNoAccess: String
})

const SiteTextModel = mongoose.model("siteText", SiteTextSchema)

export default SiteTextModel