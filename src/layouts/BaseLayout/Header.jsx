import { useDarkModeContext } from "@/contexts";
import styles from "./Header.module.css";
import { LuUserRound } from "react-icons/lu";
import { LuLogIn } from "react-icons/lu";
import { LuMoonStar } from "react-icons/lu";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  Tooltip,
} from "@/components";
import { RiSearchLine } from "react-icons/ri";
import { LuMenu } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "@/constants";

const Header = () => {
  const { toggleDarkMode, isDarkMode } = useDarkModeContext();
  const navigate = useNavigate();

  const tooltips = [
    {
      text: "마이페이지",
      icon: <LuUserRound size={20} onClick={() => navigate(PageEndPoints.MYPAGE)}/>,
    },
    {
      text: "로그인",
      icon: <LuLogIn size={20} onClick={() => navigate(PageEndPoints.LOGIN)} />,
    },
    {
      text: isDarkMode ? "밝게" : "어둡게",
      icon: <LuMoonStar size={20} onClick={toggleDarkMode} />,
    },
    {
      text: "검색",
      icon: (
        <RiSearchLine
          size={20}
          onClick={() => navigate(PageEndPoints.SEARCH)}
        />
      ),
    },
  ];

  const menus = [
    {
      text: "여행 계획",
      onClick: () => navigate(PageEndPoints.PLAN_LIST),
    },
    {
      text: "게시판",
      onClick: () => navigate(PageEndPoints.BOARD),
    },
    {
      text: "공지사항",
      onClick: () => navigate(PageEndPoints.NOTICE),
    },
  ];

  return (
    <header className={styles.container}>
      <p className={styles.title} onClick={() => navigate(PageEndPoints.HOME)}>
        JUST PLAN IT !
      </p>

      {/** web */}
      <nav className={styles.nav_container}>
        {menus.map((menu, index) => (
          <p key={index} className={styles.nav_item} onClick={menu.onClick}>
            {menu.text}
          </p>
        ))}

        <div className={styles.icon_container}>
          {tooltips.map((tooltip, index) => (
            <Tooltip key={index} text={tooltip.text}>
              <Button variant="none" size="sm">
                {tooltip.icon}
              </Button>
            </Tooltip>
          ))}
        </div>
      </nav>

      {/* mobile */}
      <nav className={styles.mobile_nav_container}>
        <Drawer>
          <DrawerTrigger>
            <LuMenu size={28} className={styles.icon_menu} />
          </DrawerTrigger>
          <DrawerContent>
            <div className={styles.sidebar_container}>
              {menus.map((menu, index) => (
                <p key={index} className={styles.nav_item}>
                  {menu.text}
                </p>
              ))}

              <div className={styles.sidebar_icons_box}>
                {tooltips.map((tooltip, index) => (
                  <Tooltip key={index} text={tooltip.text}>
                    <Button variant="solid" size="sm">
                      {tooltip.icon}
                    </Button>
                  </Tooltip>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </nav>
    </header>
  );
};

export default Header;
