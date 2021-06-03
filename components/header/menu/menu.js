import { useState, useEffect } from "react";
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import { getMeApi } from "../../../api/user";
import { getPlatformApi } from "../../../api/platform";
import { map } from "lodash";
import Link from "next/link";
import BasicModal from "../../modal/BasicModal";
import Auth from "../../auth";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";

export default function MenuWeb() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("Login");
    const [user, setUser] = useState(undefined);
    const [platforms, setPlatforms] = useState([]);
    const { auth, logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout);
            setUser(response);
        })();
    }, [auth]);

    useEffect(() => {
        (async () => {
            const response = await getPlatformApi();
            setPlatforms(response || []);
        })();
    }, []);

    const onShowModal = () => setShowModal(true);

    const onCloseModal = () => setShowModal(false);

    return (
        <div className="menu">
            <Container>
                <Grid>
                    <Grid.Column className="menu__left" width={6}>
                        <MenuPlatform platforms={platforms} />
                    </Grid.Column>
                    <Grid.Column className="menu__right" width={10}>
                        {user !== undefined && (
                            <MenuOptions
                                onShowModal={onShowModal}
                                user={user}
                                logout={logout}
                            />
                        )}
                    </Grid.Column>
                </Grid>
            </Container>
            <BasicModal
                show={showModal}
                setShow={setShowModal}
                title={titleModal}
                size="small"
            >
                <Auth setTitleModal={setTitleModal} onCloseModal={onCloseModal} />
            </BasicModal>
        </div>
    );
}

function MenuPlatform({ platforms }) {
    return (
        <Menu>
            {map(platforms, (platform) => (
                <Link href={`/games/${platform.url}`} key={platform._id}>
                    <Menu.Item as="a" name={platform.url}>
                        {platform.title}
                    </Menu.Item>
                </Link>
            ))}
        </Menu>
    );
}

function MenuOptions({ onShowModal, user, logout }) {
    const { productsCart } = useCart();
    return (
        <Menu>
            {user ? (
                <>
                    <Link href="/orders">
                        <Menu.Item as="a">
                            <Icon name="game" />
                Mis Pedidos
            </Menu.Item>
                    </Link>
                    <Link href="/wishlist">
                        <Menu.Item as="a">
                            <Icon name="heart" />
                Wishlist
            </Menu.Item>
                    </Link>
                    <Link href="/account">
                        <Menu.Item as="a">
                            <Icon name="user" />
                            {user.name} {user.lastname}
                        </Menu.Item>
                    </Link>
                    <Link href="/cart">
                        <Menu.Item as="a" className="m-0">
                            <Icon name="cart" />
                            {productsCart > 0 && (
                                <Label color="red" floating circular>
                                    {productsCart}
                                </Label>
                            )}
                        </Menu.Item>
                    </Link>
                    <Menu.Item onClick={logout} className="m-0">
                        <Icon name="power off" />
                    </Menu.Item>
                </>
            ) : (
                <Menu.Item onClick={() => onShowModal()}>
                    <Icon name="user outline" />
          Mi Cuenta
                </Menu.Item>
            )}
        </Menu>
    );
}
