import { Navbar as NavbarMT, createStyles } from "@mantine/core";
import { Haze, Home, LeafOff, User, Robot } from "tabler-icons-react";
import UserButton from "../UserButton/UserButton";

const linkData = [
  { link: "", label: "Home", icon: Home },
  { link: "", label: "Profile", icon: User },
  ];
const additionalLinksData = [
 
  { link: "https://aqi-checker.vercel.app/", label: "Air Quality Index", icon: Haze },
  { link: "https://co2-footprint-predictor.streamlit.app/", label: "Carbon Tracker", icon: LeafOff },
  { link: "https://mediafiles.botpress.cloud/e6c594eb-26f3-4ee9-953f-f6329e9e9cf7/webchat/bot.html", label: "AI GreenBot", icon: Robot },
];

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    navbar: {
      position: "sticky",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors[theme.primaryColor][0],
        color:
          theme.colorScheme === "dark"
            ? theme.white
            : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color:
            theme.colors[theme.primaryColor][
              theme.colorScheme === "dark" ? 5 : 7
            ],
        },
      },
    },
  };
});

const Navbar = ({ page, setPage }) => {
  const { classes, cx } = useStyles();

  const links = linkData.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === page,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setPage(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </a>
  ));

const additionalLinks= additionalLinksData.map((item)=>(
    <a className={classes.link}
    href={item.link}
    ><item.icon className={classes.linkIcon} />
    <span>{item.label}</span>
    </a>
  ))

  return (
    <NavbarMT width={{ xs: 200, sm: 300 }} p="md" className={classes.navbar}>
      <NavbarMT.Section grow>{links}{additionalLinks}</NavbarMT.Section>

      <NavbarMT.Section className={classes.footer}>
        <UserButton />
      </NavbarMT.Section>
    </NavbarMT>
  );
};

export default Navbar;
