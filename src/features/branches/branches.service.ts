import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch)
    private branchesRepository: Repository<Branch>,
  ) {}

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    const branch = this.branchesRepository.create(createBranchDto);
    return this.branchesRepository.save(branch);
  }

  async findAll(): Promise<Branch[]> {
    return this.branchesRepository.find({ relations: ['country', 'representative'] });
  }

  async findOne(id: number): Promise<Branch | null> {
    return this.branchesRepository.findOne({ 
      where: { id }, 
      relations: ['country', 'representative'] 
    });
  }

  async update(id: number, updateBranchDto: UpdateBranchDto): Promise<Branch | null> {
    await this.branchesRepository.update(id, updateBranchDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.branchesRepository.delete(id);
  }
}
