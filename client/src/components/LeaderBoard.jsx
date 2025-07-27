const leaderboard = [
    { KDA: { kill: 2, dead: 0, assist: 0, }, nick: "test" },
    { KDA: { kill: 1, dead: 1, assist: 0, }, nick: "test2" },
    { KDA: { kill: 0, dead: 0, assist: 0, }, nick: "test3" },
    { KDA: { kill: 0, dead: 0, assist: 0, }, nick: "test4" },
]

export default function LeaderBoard({ ref }) {//geçici olarak leaderboardı parametre olarak almak yerine statik yapıyorum

    return <div ref={ref} className="flex flex-col justify-between bg-blue-600">

        <ul className="max-w-52">
            {leaderboard.map((player, index) => (
                <li key={index}>{`${index + 1}. ${player.KDA.kill}/${player.KDA.dead}/${player.KDA.assist} ${player.nick}`}</li>
            ))}
        </ul>

    </div>
} 