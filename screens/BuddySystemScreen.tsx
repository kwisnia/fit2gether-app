import React from "react";
import axios, { AxiosResponse } from "axios";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCodeSurface from "../components/buddy/QRCodeSurface";
import YourBuddySurface from "../components/buddy/YourBuddySurface";
import { PairInfo } from "../types/PairInfo";
import useSession from "../hooks/useSession";
import { useIsFocused } from "@react-navigation/native";
import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { ConnectionResponse } from "../types/ConnectionResponse";

const BuddySystemScreen: React.FunctionComponent = () => {
    const [pairInfo, setPairInfo] = React.useState<PairInfo | null>(null);
    const isFocused = useIsFocused();
    const [session, refreshSessionInfo, updateSession] = useSession();
    const [scanning, setScanning] = React.useState(false);
    const [scanned, setScanned] = React.useState(false);

    React.useEffect(() => {
        if (session?.buddyId) {
            const fetchPairInfo = async () => {
                const pair: AxiosResponse<PairInfo> = await axios.get(
                    "/pairInfo"
                );
                setPairInfo(pair.data);
            };
            void fetchPairInfo();
        }
    }, [session]);

    React.useEffect(() => {
        if (isFocused) {
            refreshSessionInfo();
        }
    }, [isFocused, refreshSessionInfo]);

    const handleBarCodeScanned: BarCodeScannedCallback = async ({
        type,
        data,
    }) => {
        if (!scanned) {
            setScanned(true);
            setScanning(false);
            const inviteCode = data.substring(11);
            const res: AxiosResponse<ConnectionResponse> = await axios.post(
                `/connect/${inviteCode}`
            );
            console.log(res.status);
            const pair: AxiosResponse<PairInfo> = await axios.get("/pairInfo");
            setPairInfo(pair.data);
            if (session) {
                updateSession({
                    ...session,
                    buddyId: res.data.buddyId,
                    buddyProfilePicture: res.data.buddyProfilePicture,
                    token: {
                        ...session.token,
                        accessToken: res.data.accessToken,
                    },
                });
            }
        }
    };

    return (
        <SafeAreaView>
            <QRCodeSurface />
            <YourBuddySurface
                buddy={pairInfo?.buddyName || null}
                setScanning={setScanning}
            />
            {scanning ? (
                <Camera
                    onBarCodeScanned={handleBarCodeScanned}
                    barCodeScannerSettings={{
                        barCodeTypes: ["qr"],
                    }}
                    style={{ ...StyleSheet.absoluteFillObject, elevation: 999 }}
                />
            ) : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    qrContainerTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 24,
        marginVertical: 17,
    },
    buddyText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
        paddingTop: 10,
    },
    contentContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    qrContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 30,
        marginHorizontal: 30,
    },
});

export default BuddySystemScreen;
