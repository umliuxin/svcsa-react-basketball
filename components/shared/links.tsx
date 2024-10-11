import Link from "next/link";
import React from "react";
import type { CompetitionGroup } from "@/utils/variables";
/**
 * Support:
 * - Player
 * - Team
 * - Match
 */

interface LinksProps {
  type: "players" | "teams" | "matches";
  id: number;
  competition: CompetitionGroup;
  children: React.ReactNode;
}

const Links: React.FC<LinksProps> = ({ competition, id, type, children }) => {
  return (
    <Link href={`/basketball/${competition}/${type}/${id}`}>{children}</Link>
  );
};

export default Links;
