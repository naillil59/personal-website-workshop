export default function About() {
  return (
    <div>
      <div className="flex h-full min-h-full items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="text-4xl font-semibold uppercase">
          About
        </div>
      </div>
      <br></br>
      <div className="body-text" style={{margin: "3%"}}>
          Hello, I am a student at UT Austin who is currently majoring in Behavioral and Social Data Science.
          My hometown is Houston, TX and in my free time I enjoy watching anime, playing piano, and playing Brawlstars!
          My current interests are fullstack development and AI.
      </div>
    </div>
  );
}
