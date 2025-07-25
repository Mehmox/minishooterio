import LeaderBoard from "./LeaderBoard";
import Dev from "./Dev"

export default function Tab({ className, score, dev }) {

    return <section className="z-[1] w-full h-full fixed flex justify-center items-start mt-14" >

        <div className={className}>
            <Dev dev={dev} className="flex flex-col justify-center items-center" />
            <LeaderBoard leaderboard={score}></LeaderBoard>
        </div>

    </section>

}