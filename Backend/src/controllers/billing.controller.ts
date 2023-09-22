import { NextFunction, Request, Response } from "express";
import { CreateBillingDto } from "@/dtos/billing.dto";
import { Billing } from "@/interfaces/billing.interface";
import billingService from "@/services/billing.service";

class BillingController {
    public billingService = new billingService();

    public create = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const billingData: CreateBillingDto = req.body;
            const createBillingData: Billing = await this.billingService.createBilling(billingData);
            return res.status(201).json({ data: createBillingData, message: "created" });
        } catch (error) {
            next(error);
        }
    }

    public findAll = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const findAllBillingData: Billing[] = await this.billingService.findAllBilling();
            return res.status(200).json({ data: findAllBillingData, message: "findAll" });
        } catch (error) {
            next(error);
        }
    }

    public findBillingById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const billingId: number = parseInt(req.params.id, 10);
            const findOneBillingData: Billing = await this.billingService.findBillingById(billingId);
            return res.status(200).json({ data: findOneBillingData, message: "findOne" });
        } catch (error) {
            next(error);
        }
    }

    public updateBilling = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const billingId: number = parseInt(req.params.id, 10);
            const billingData: CreateBillingDto = req.body;
            const updateBillingData: Billing = await this.billingService.updateBilling(billingId, billingData);
            return res.status(200).json({ data: updateBillingData, message: "updated" });
        } catch (error) {
            next(error);
        }
    }

    public deleteBilling = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const billingId: number = parseInt(req.params.id, 10);
            const deleteBillingData: Billing = await this.billingService.deleteBilling(billingId);
            return res.status(200).json({ data: deleteBillingData, message: "deleted" });
        } catch (error) {
            next(error);
        }
    }

    public findBillingByUserId = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const userId: number = parseInt(req.params.id, 10);
            const findBillingData: Billing = await this.billingService.findBillingById(userId);
            return res.status(200).json({ data: findBillingData, message: "findOne" });
        } catch (error) {
            next(error);
        }
    }
}

export default BillingController;
