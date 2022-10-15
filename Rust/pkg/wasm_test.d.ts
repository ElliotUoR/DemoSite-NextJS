/* tslint:disable */
/* eslint-disable */
/**
* @param {number} n1
* @param {number} n2
* @returns {number}
*/
export function add(n1: number, n2: number): number;
/**
* @returns {string}
*/
export function hash(): string;
/**
* @param {string} input
* @returns {string}
*/
export function hashInput(input: string): string;
/**
* @param {string} input
* @param {boolean} nonce
* @returns {string}
*/
export function hashInputNonce(input: string, nonce: boolean): string;
/**
* @param {string} input
* @param {number} nonce
* @returns {string}
*/
export function hashInputWithNonce(input: string, nonce: number): string;
/**
* @returns {number}
*/
export function getNonce(): number;
/**
* @param {string} x
*/
export function take_string_by_value(x: string): void;
/**
* @returns {string}
*/
export function return_string(): string;
/**
* @param {string | undefined} x
*/
export function take_option_string(x?: string): void;
/**
* @returns {string | undefined}
*/
export function return_option_string(): string | undefined;
/**
* @returns {string}
*/
export function pickRandomString(): string;
/**
* @returns {number}
*/
export function random_float(): number;
