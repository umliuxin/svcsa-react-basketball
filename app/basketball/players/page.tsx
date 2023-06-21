'use client';
import nextConfig from '@/next.config';
import {Table, Row, Col, Link, User, Text} from "@nextui-org/react";


type bbPlayer = {
    id: number;
    name: string;
    weight: number;
    email: string;
    sex: string;
    height: number;
    photosrc: string;

}
export default async function Page() {
    const res = await fetch(nextConfig.BackendUrl + '/players');
    const playerArray = await res.json();
    console.log(playerArray);
    const columns = [
        { name: "NAME", uid: "name" },
        { name: "HEIGHT", uid: "height" },
        { name: "WEIGHT", uid: "weight" },
        { name: "GENDER", uid: "sex" },
    ];
    const renderCell = (player: bbPlayer, columnKey: React.Key) => {
        const cellValue = player[columnKey];
        switch (columnKey) {
            case "name":
                return (
                    <Link href={nextConfig.FrontendUrl + "/basketball/players/" + player.id}>
                    <User squared src={player?.photosrc} name={cellValue} css={{ p: 0 }}>
                        {player.email}
                    </User>
                    </Link>
                );
            default:
                return (
                    <Col>
                        <Row>
                            <Text b size={14} css={{ tt: "capitalize" }}>
                                {cellValue}
                            </Text>
                        </Row>
                    </Col>
                );
        }
    };
    return (
        <Table
            aria-label="Players"
            css={{
                height: "auto",
                minWidth: "100%",
            }}
            selectionMode="none"
        >
            <Table.Header columns={columns}>
                {(column) => (
                    <Table.Column
                        key={column.uid}
                        hideHeader={column.uid === "actions"}
                        align={column.uid === "actions" ? "center" : "start"}
                    >
                        {column.name}
                    </Table.Column>
                )}
            </Table.Header>
            <Table.Body items={playerArray.data}>
                {(item: bbPlayer) => (
                    <Table.Row>
                        {(columnKey) => (
                            <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                        )}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
    // return (
    //     <table>
    //         <thead>
    //         <tr>
    //             <th>ID</th>
    //             <th>Name</th>
    //             <th>Weight</th>
    //             <th>Email</th>
    //             <th>Gender</th>
    //             <th>Height</th>
    //             <th>Photo</th>
    //
    //         </tr>
    //         </thead>
    //         <tbody>
    //         {jsonArray.data.map((player: bbPlayer) => (
    //             <tr key={player.id}>
    //                 <td>{player.id}</td>
    //                 <td>{player.name}</td>
    //                 <td>{player.weight}</td>
    //                 <td>{player.email}</td>
    //                 <td>{player.sex}</td>
    //                 <td>{player.height}</td>
    //                 <td>
    //                     <img src={player.photosrc} alt="Logo" width="50" height="50" />
    //                 </td>
    //             </tr>
    //         ))}
    //         </tbody>
    //     </table>
    // );
}
