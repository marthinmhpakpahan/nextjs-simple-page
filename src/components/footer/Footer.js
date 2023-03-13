import styles from "../../styles/Home.module.css";
import { Grid, Button, Item } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Footer() {
    const { data: session } = useSession();
    return (
        <div className={styles.customHeader}>
            <Grid container justifyContent="center">
                <h3>F O O T E R</h3>
            </Grid>
        </div>
    );
}