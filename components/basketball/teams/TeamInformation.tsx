"use client"; // 指定这是一个客户端组件

import React, { useState } from "react";
import Custom404 from "@/components/404";
import { Image } from "@nextui-org/react";
import Link from "next/link";

interface TeamInformationProps {
  team: BbTeam;
  playerCount?: number; // 球队队员总数
}

const TeamInformation: React.FC<TeamInformationProps> = ({
  team,
  playerCount,
}) => {
  const [imageLoadingError, setImageLoadingError] = useState(false);

  // 如果球队信息不存在，显示404页面
  if (!team) {
    return <Custom404 />;
  }

  return (
    <div className="bg-white p-4 rounded-large shadow-small flex flex-col justify-between h-full">
      <div className="items-center justify-center flex">
        {team.logosrc && (
          <Image
            src={team.logosrc}
            alt={`${team.name} Logo`}
            className="items-center h-48"
            onError={() => setImageLoadingError(true)}
          />
        )}
      </div>
      <div className="text-center">
        {imageLoadingError && <p>图片加载失败</p>}
        <h2 className="text-2xl font-bold">{team.name}</h2>
        <p className="text-gray-600" style={{ textAlign: "center" }}>
          {team.description}
        </p>
      </div>

      {/* 队长信息部分 */}
      <div
        className=""
        style={{ textAlign: "center" }}
      >
        <p>
          <span className="font-bold">队长: </span>
          {team.captain}
        </p>

        {playerCount !== undefined && (
          <p>
            <span className="font-bold">球队队员总数: </span>
            {playerCount}
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamInformation;
