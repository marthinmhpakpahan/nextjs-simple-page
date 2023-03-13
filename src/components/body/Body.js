import styles from "../../styles/Home.module.css";
import { Grid, Button, Item } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

export default function Body() {
    const { data: session } = useSession();

    return (
        <div className={styles.customBody}>
            {session ? (
                <Button variant="contained">Subscribe Now</Button>
            ) : (
                <h3>Please login first to subscribe our plan!</h3>
            )}
        </div>
    );
}