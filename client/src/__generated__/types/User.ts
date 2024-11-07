export type User = {
    /**
     * @type number
    */
    id: number;
    /**
     * @type string
    */
    email: string;
    /**
     * @type boolean
    */
    isAdmin?: boolean | null;
    /**
     * @type object
    */
    company: {
        /**
         * @type number
        */
        id: number;
        /**
         * @type string
        */
        name: string;
        /**
         * @type string
        */
        logo: string;
        /**
         * @type string
        */
        email: string;
        /**
         * @type string, uri
        */
        url: string;
    } | null;
    /**
     * @type string
    */
    createdAt: string;
};