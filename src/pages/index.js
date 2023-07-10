import Head from "next/head";
import {Element as Section} from "react-scroll";
import {
    AboutSection,
    BlogSection,
    HeroSection,
    ResumeSection,
    ReviewsSection,
    SkillsSection,
} from "../components/containers";
import {Layout} from "../components/layout";
import {SectionHeading} from "../components/utils";
import {getPostsByPage} from "../lib/blogging";

const index = () => {
    return (
        <Layout blurred>
            <Head>
                <title>Portafolio :: Paulo</title>
            </Head>

            {/* Start Hero Section */}
            <Section name="section-home">
                <HeroSection blurred/>
            </Section>
            {/* End Hero Section */}

            {/* Start About Section */}
            <Section name="section-about" className="about-section pt-24 lg:pt-28 xl:pt-32">
                <div className="container mx-auto">
                    <SectionHeading animated={false} title="Sobre mí" watermark="About"/>
                    <AboutSection/>
                </div>
            </Section>
            {/* End About Section */}

            {/* Start Skills Section */}
            <Section name="section-skills" className="skills-section pt-24 lg:pt-28 xl:pt-32">
                <div className="container mx-auto">
                    <SectionHeading animated={false} title="Mis Habilidades" watermark="Skills"/>
                    <SkillsSection/>
                </div>
            </Section>
            {/* End Skills Section */}

            {/* Start Resume Section */}
            <Section name="section-resume" className="resume-section pt-24 lg:pt-28 xl:pt-32">
                <div className="container mx-auto">
                    <SectionHeading animated={false} title="Currículum" watermark="Resume"/>
                    <ResumeSection/>
                </div>
            </Section>
            {/* End Resume Section */}

            {/* Start Blog Section */}
            <Section name="section-blog" className="news-section pt-24 lg:pt-28 xl:pt-32">
                <div className="container mx-auto">
                    <SectionHeading animated={false} title="Portafolio" watermark="Works"/>
                    <BlogSection />
                </div>
            </Section>
            {/* End Blog Section */}

            {/* Start Reviews Section */}
            <Section name="section-reviews" className="reviews-section pt-24 lg:pt-28 xl:pt-32">
                <div className="container mx-auto">
                    <SectionHeading animated={false} title="Recomendaciones" watermark="References"/>
                    <ReviewsSection/>
                </div>
            </Section>
            {/* End Reviews Section */}

            <span className="block pb-24 lg:pb-28 xl:pb-32" />
        </Layout>
    );
};

export default index;

export function getStaticProps() {
    const {posts} = getPostsByPage();

    return { props: { posts }, revalidate: 10 };
}