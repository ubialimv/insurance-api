import express, { Router, Request, Response } from 'express';

import User from '../../domain/user/user.entity';
import { PlanServiceInterface } from '../../domain/plan/plan.service';
import BaseController from './base.controller';

export default class PlanController extends BaseController {
  private router: Router = express.Router();

  constructor(private readonly planService: PlanServiceInterface) {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post('/plans/suggestions', this.findPlanOrEligibility);
  }

  public getRoutes() {
    return this.router;
  }

  findPlanOrEligibility = async (req: Request, res: Response) => {
    try {
      const user = new User({ ...req.body });

      const plans = this.planService.findPlanOrEligibility(user);

      this.ok(res, plans);
    } catch (error) {
      this.serverError(res, error as Error);
    }
  };
}
