export default function LeaderBoard({ref, leaderboard }) {

    return <div ref={ref} className="flex flex-col justify-between">

        <ul className="max-w-52">
            {leaderboard.map((player, index) => (
                <li key={index}>{`${index + 1}. ${player.KDA.kill}/${player.KDA.dead}/${player.KDA.assist} ${player.nick}`}</li>
            ))}
        </ul>

    </div>
} 