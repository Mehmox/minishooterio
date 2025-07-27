export default function LeaderBoard({ leaderboard }) {

    return <table className="max-w-52">

        <tbody>

            {leaderboard && Object.entries(leaderboard).map((player, index) => (<tr key={index}>
                <td className="px-4">{index + 1}</td>
                <td>{player.kill}</td>
                <td>/</td>
                <td>{player.dead}</td>
                <td>/</td>
                <td>{player.assist}</td>
                <td className="px-4">{player.nick}</td>
            </tr>))}

        </tbody>

    </table>
} 