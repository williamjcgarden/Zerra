import { Link } from "@/demos/dovetail/navigation";
import { LogoMark } from "@/demos/dovetail/components/LogoMark";
import { ZERRA_WORK_URL } from "@/demos/dovetail/lib/zerra";
import { OutfitBoards } from "@/demos/dovetail/components/OutfitBoards";
import { Navbar } from "@/demos/dovetail/components/Navbar";
import { Footer } from "@/demos/dovetail/components/Footer";


function StoryPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="page-main studio-story" tabIndex={-1}>
        <section className="shell studio-story-hero" aria-labelledby="story-title">
          <div className="studio-story-intro">
            <p className="eyebrow">Dovetail / Studio notes</p>
            <h1 id="story-title">
              About
              <br />
              <em>the studio.</em>
            </h1>
            <p className="studio-story-lead">Relaxed clothing. Considered together.</p>
            <p>
              Dovetail explores a small wardrobe of familiar shapes, soft colour and room to move.
              Each piece has its own character. The interest comes from how you put them together.
            </p>
            <a className="text-link" href="#studio-approach">
              Explore our approach <span aria-hidden="true">↓</span>
            </a>
          </div>
          <figure className="studio-story-photo">
            <img
              src="/demos/dovetail/media/product-boxy-crew-960.webp"
              alt="Apricot Boxy Crew with the geometric bird mark"
              width={960}
              height={1200}
              decoding="async"
            />
            <figcaption>
              <span>01 / Shape, colour, texture</span>
              <span>Boxy Crew · Apricot</span>
            </figcaption>
          </figure>
        </section>
        <section
          id="studio-approach"
          className="shell section studio-principles"
          aria-labelledby="philosophy-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">The way the pieces work</p>
              <h2 id="philosophy-title">A shared point of view.</h2>
            </div>
            <p className="muted">
              Three ideas behind
              <br />
              the Dovetail wardrobe.
            </p>
          </div>
          <div className="studio-principle-grid">
            <article>
              <span className="eyebrow">01 / Shape</span>
              <h3>Room to move.</h3>
              <p>
                Boxy tees, straight trousers and generous outer layers. Familiar proportions, with
                space for a layer underneath.
              </p>
            </article>
            <article>
              <span className="eyebrow">02 / Colour</span>
              <h3>Colour with company.</h3>
              <p>
                Chalk and dusty blue. Apricot and ochre. A deeper note of plum. A small palette
                opens up more combinations.
              </p>
              <div
                className="studio-palette"
                role="img"
                aria-label="Chalk, dusty blue, apricot, ochre and plum"
              >
                <span style={{ background: "#e3d2b8" }} />
                <span style={{ background: "#687f96" }} />
                <span style={{ background: "#dba57d" }} />
                <span style={{ background: "#bd925b" }} />
                <span style={{ background: "#654451" }} />
              </div>
            </article>
            <article>
              <span className="eyebrow">03 / Styling</span>
              <h3>Start with one piece.</h3>
              <p>
                A tee beneath a chore jacket. A crew above a straight work pant. Build around the
                piece you like and make the combination your own.
              </p>
            </article>
          </div>
        </section>
        <div className="studio-outfits">
          <OutfitBoards />
        </div>
        <section className="shell section studio-concept" aria-labelledby="studio-concept-title">
          <div className="studio-concept-mark">
            <LogoMark />
          </div>
          <div>
            <p className="eyebrow">Behind the concept</p>
            <h2 id="studio-concept-title">Imagined by Zerra Studios.</h2>
            <p>
              Dovetail is a fictional clothing brand created as a website and branding concept. The
              identity, product imagery and shopping experience show how a brand can carry through
              every detail.
            </p>
            <p className="small muted">
              Products, materials and prices are illustrative. No real orders or payments.
            </p>
            <a className="text-link" href={ZERRA_WORK_URL}>
              Explore Zerra Studios <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
        <div className="shell story-shop-link">
          <Link to="/" search={{}} hash="shop" className="button">
            Explore the wardrobe
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default StoryPage;
