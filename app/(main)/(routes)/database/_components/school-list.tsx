"use client"

// utils
import { cn } from "@/lib/utils";
import Loader from "@/components/loader";
import { toast } from "sonner";
import PubSub from "pubsub-js";
// components
import NoData from "@/components/no-data";
import ObjectAction from "./object-action";
// hooks
import { useState, useEffect } from "react";
// types
import type { School } from "@/types/modelType/school";
// stores
import useSelectedSchool from "@/stores/databse/selectedSchool";

const SchoolList: React.FC = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [allSchools, setAllSchools] = useState<School[]>([]);
    const { selectedSchool, setSelectedSchool } = useSelectedSchool();

    // 初始化
    useEffect(() => {
        // 1. 获取学校列表
        getSchools();

        // 2. 订阅刷新学校列表事件
        const token = PubSub.subscribe("refresh-school-list", () => getSchools());

        return () => {
            PubSub.unsubscribe(token);
        }
    }, []);

    const getSchools = async () => {
        setIsFetching(true);
        const res = await fetch("/api/data/school");

        if (res.ok) {
            const data = await res.json();
            setAllSchools(data);
        } else {
            const data = await res.json();
            toast.error(data.message);
        }

        setIsFetching(false);
    };

    function selectSchool(school: School) {
        if (selectedSchool?._id === school._id) {
            setSelectedSchool(null);
        } else {
            setSelectedSchool(school);
        }
    }


    if (isFetching) return (
        <div className="mt-2 ml-2 flex items-center">
            <Loader size="lg" />
        </div>
    )

    if (allSchools.length === 0) return (
        <div className="w-full h-full flex items-center justify-center">
            <NoData />
        </div>
    )

    return (
        <div className="p-2 space-y-2">
            <h1 className="text-lg font-bold p-4 border-b">学校</h1>
            <ul className="w-full flex flex-col">
                {allSchools.map((school) => (
                    <li
                        key={school._id}
                        className={
                            cn(
                                "w-full h-10 px-4 rounded-md",
                                "line-clamp-1 whitespace-nowrap text-sm",
                                "flex items-center justify-between",
                                "hover:bg-primary-foreground cursor-pointer",
                                "group",
                                selectedSchool?._id === school._id && "bg-primary text-white hover:bg-primary font-bold"
                            )
                        }
                        onClick={() => selectSchool(school)}
                    >
                        {school.school_name}
                        <ObjectAction
                            href="/database/school/"
                            id={school._id}
                            className={cn("invisible group-hover:visible", selectedSchool?._id === school._id && "text-white")}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SchoolList;