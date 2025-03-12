import { BaseLayout } from "@/layouts";
import styles from "./Destination.module.css";
import { planItems,dummy } from "./constants";
import Weather from "./components/Weather";
import { useEffect, useState, useCallback } from "react";
import DestinationMap from "./components/DestinationMap";
import {Slider, Loading, PlanCard} from "@/components";
import { IoIosStar } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useAxios } from "@/hooks";
import { APIEndPoints } from "@/constants";

const Destination = () => {
    const location = useLocation();
    const cityName = location.state?.cityName;
    const { loading, fetchData, response } = useAxios();
    const { fetchData: fetchApi } = useAxios();
    const [item,setItem]= useState();
    const [plans, setPlans] = useState();
    const [selectedPlace, setSelectedPlace] = useState("오사카");

    const fetchDestination = useCallback(async () => {
        await fetchData({
            method:"GET",
            url: `${APIEndPoints.DESTINATION}`,
            params: {
                category:"CITY",
                filter: cityName,
            }
        }).then((res) => {
            const items = res.data[0];
            setItem(items);
        }).catch((err) => {
            console.log(err);
        })
    }, [fetchData,cityName,setItem])

    const fetchPlans = useCallback(()=>{
        fetchApi({
            method:"GET",
            url: APIEndPoints.TRIP_SEARCH,
            params: {
                category: "CITY",
                keyword: cityName,
            }
        }).then((res)=>{
            console.log(res.data.items);
            setPlans(res.data.items);
        }).catch((err)=>{
            console.log(err);
        })
    })

    useEffect(()=>{
        fetchPlans();
        fetchDestination();
    },[fetchDestination,cityName])

    const handleClick = (value) => {
        let Url= "";
        if(value==="plane"){
            Url = `https://www.skyscanner.co.kr/`;
        }else{
            Url = `https://www.agoda.com/`;
        }

        window.open(Url, "_blank"); // 새 탭에서 열기
      };

    return(
        <BaseLayout>
        {loading ? (
        <Loading />
      ) : (
        item &&(
            <div className={styles.container}>
                <div className={styles.title_box}>
                    <p className={styles.main_title}>{item.name}</p>
                </div>
                <div className={styles.info_container}>
                    <div className={styles.map_container}>
                        <DestinationMap latitude={item.latitude} longitude={item.longitude}/>
                    </div>
                    <div className={styles.info_box}>
                        <div className={styles.weather_box}>
                            <Weather latitude={item.latitude} longitude={item.longitude}/>
                        </div>
                        <div className={styles.plane_box} onClick={()=>handleClick("plane")}>
                            <p className={styles.item_title}>비행기 값 알아보기</p>
                        </div>
                        <div className={styles.hotel_box} onClick={()=>handleClick("hotel")}>
                            <p className={styles.item_title}>숙소 알아보기</p>
                        </div>
                    </div>
                </div>
                <div className={styles.restraunt_container}>
                    <div className={styles.title_box}>
                            <p className={styles.title}>Famous Restraunt</p>
                    </div>
                    <Slider items={dummy} size="sm">
                        {(item) => (
                            <>
                                <div
                                className={styles.img_container}
                                style={{
                                    backgroundImage: `url(${item.profile_url})`,
                                }}
                                />
                                <div className={styles.plan_box}>
                                <div className={styles.plan_title}>
                                    <p className={styles.plan_name}>{item.title}</p>
                                    <p className={styles.plan_destination}><IoIosStar size={16} color={"yellow"}/>{item.rate} ({item.likeCount})</p>
                                </div>
                                </div>
                            </>
                        )}
                    </Slider>
                </div>
                <div className={styles.plan_container}>
                    <div className={styles.title_box}>
                            <p className={styles.title}>Like / Favorite Trip</p>
                    </div>
                    <Slider items={plans || []} size="md">
                        {(item) => (
                        <>
                            <PlanCard key={item.tripId} item={item} />
                        </>
                        )}
                    </Slider>
                </div>
            </div>
            )
        )}
        </BaseLayout>
    );
};

export default Destination;