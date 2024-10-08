"use client"; // 指定这是一个客户端组件

import React, { useState } from "react";
import Custom404 from "@/components/404";
import Link from "next/link"; // 引入 Link 组件

interface TeamInformationProps {
  team: BbTeam;
  seasonName?: string;
  playerCount?: number; // 球队队员总数
  showDetails?: boolean; // 控制是否显示详细信息
}

const TeamInformation: React.FC<TeamInformationProps> = ({
  team,
  seasonName,
  playerCount,
  showDetails = false, // 默认为不显示详细信息
}) => {
  const [imageLoadingError, setImageLoadingError] = useState(false);

  // 如果球队信息不存在，显示404页面
  if (!team) {
    return <Custom404 />;
  }

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <p className="text-gray-600 font-bold">
        赛季:
        {seasonName && (
          <Link href="#" className="text-blue-600 hover:underline">
            {seasonName}
          </Link>
        )}
      </p>

      {/* 显示球队Logo和名字 */}
      <div className="text-center">
        {team.logosrc && (
          <img
            src={team.logosrc}
            alt={`${team.name} Logo`}
            className="mx-auto mb-4 h-24"
            onError={() => setImageLoadingError(true)}
          />
        )}
        {imageLoadingError && <p>图片加载失败</p>}
        <h2 className="text-2xl font-bold">{team.name}</h2>
        <p className="text-gray-600" style={{ textAlign: "center" }}>
          {team.description}
        </p>
      </div>

      {/* 队长信息部分 */}
      <div
        className="bg-white p-4 rounded-lg shadow mt-4"
        style={{ textAlign: "center" }}
      >
        <p>
          <span className="font-bold">队长: </span>
          {team.captain}
        </p>
        <p>
          <span className="font-bold">邮箱: </span>
          <Link
            href={`mailto:${team.email}`}
            className="text-blue-600 underline"
          >
            {team.email}
          </Link>
        </p>
        <p>
          <span className="font-bold">电话: </span>
          {team.tel}
        </p>
        <p>
          <span className="font-bold">微信: </span>
          {team.wechat}
        </p>
        <p>
          <span className="font-bold">球队编号: </span>
          {team.id}
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
