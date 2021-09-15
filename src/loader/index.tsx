import { Application } from 'express';
import loadExpress from './express';
import configurePassport from './passport';

type loadApplicationOptions = {
    app: Application
};
export async function loadApplication({ app }: loadApplicationOptions) {
    configurePassport();
    loadExpress({ app });
};