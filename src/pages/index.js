import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Grid, Button } from "@mui/material";
import Body from "@/components/body/Body";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className={styles.container}>
      <Header></Header>
      <main className={styles.main}>     
        <h1 className={styles.largeTitle}>Quick interior designs for your home space</h1>
        <h3>Create interior designs and virtual staging mockups for any home space in 35+ styles - powered by AI</h3>
        <Grid container>
          <Grid item md={2}></Grid>
          <Grid item md={2}></Grid>
        </Grid>
        <br/>
        <Body></Body>
      </main>
      <Footer></Footer>
    </div>
  );
}