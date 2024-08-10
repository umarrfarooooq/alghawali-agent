import React, { useState, useEffect } from "react";
import { MaidProfile } from "./Maid-Profile";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axiosInstanse";
import HomeComponent from "@/components/Home/Home-component";
import { VerifyAgentToken } from "@/lib/VerifyAgentToken";
import NoMaid from "../Home/No-Maid";

const AllMaids = () => {
  const { agentId, verifyToken } = VerifyAgentToken();
  const [total, setTotal] = useState(0);
  const [maids, setMaids] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(8);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    const fetchMaids = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `api/v1/agentMaids/agent-maids/${agentId}`,
          {
            headers: {
              Authorization: `Bearer ${verifyToken}`,
            },
            params: { offset, limit, search },
          }
        );
        setMaids([...maids, ...response.data.data]);
        setTotal(response.data.total);
        setHasMore(response.data.hasMore);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaids();
  }, [offset, search]);

  const handleLoadMore = () => {
    setOffset(offset + limit);
  };

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
    setOffset(0);
    setMaids([]);
  };

  return (
    <>
      <HomeComponent count={total && total} onSearch={handleSearch} />
      {total <= 0 ? (
        <NoMaid />
      ) : (
        <div className="container px-4">
          <div className="w-full border rounded-2xl border-solid p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {maids.map((maid) => (
              <MaidProfile key={maid._id} maid={maid} />
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-4">
              <Button
                disabled={loading}
                className="w-full max-w-36 bg-[#107243] shadow-md"
                onClick={handleLoadMore}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Load More
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllMaids;
