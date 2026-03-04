export const Footer = () => {
    const currentDate = new Date().getFullYear();
    return (
        <div className="m-10 self-center">
            Copyright (c) {currentDate} NickyHariniaina. All Rights Reserved.
        </div>
    );
};
