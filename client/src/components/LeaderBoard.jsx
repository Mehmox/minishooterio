export default function LeaderBoard({ ref, leaderboard }) {
    // console.log(leaderboard)
    return <div ref={ref} className="flex flex-col justify-between bg-blue-600">

        <ul className="max-w-52">
            {leaderboard && leaderboard.map((player, index) => (
                <li key={index}>{`${index + 1}. ${player.kill}/${player.dead}/${player.assist} ${player.nick}`}</li>
            ))}
        </ul>

    </div>
} 