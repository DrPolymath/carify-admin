import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FormDialog from './FormDialog';

const MoreMenu = ({ title, carBrand, carType }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);
    return (
        <div>
            <MoreVertIcon
                color='primary'
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            />
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem>
                            {carBrand ? (
                                <FormDialog title={title} carBrand={carBrand} update='yes' moreMenu="yes" handleCloseMoreMenu={handleToggle}/>
                            ) : (
                                <FormDialog title={title} carType={carType} update='yes' moreMenu="yes"  handleCloseMoreMenu={handleToggle}/>
                            )}
                        </MenuItem>
                        <MenuItem>
                            {carBrand ? (
                                <FormDialog title="Delete Car Brand" carBrand={carBrand} toDelete="yes" moreMenu="yes" handleCloseMoreMenu={handleToggle}/>
                            ) : (
                                <FormDialog title="Delete Body Type" carType={carType} toDelete="yes" moreMenu="yes"  handleCloseMoreMenu={handleToggle}/>
                            )}
                        </MenuItem>
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </Popper>
        </div>
    );
}

export default MoreMenu
