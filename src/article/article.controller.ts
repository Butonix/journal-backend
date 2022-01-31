import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query, UseGuards,
} from '@nestjs/common';
import {ArticleService} from './article.service';
import {CreateArticleDto} from './dto/create-article.dto';
import {UpdateArticleDto} from './dto/update-article.dto';
import {searchArticleDto} from './dto/search-article.dto';
import {PaginationArticleDto} from './dto/pagination-article.dto';
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';
import {User} from "../Decorators/user.decorator";
import {UserEntity} from "../users/entities/user.entity";

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@User() userId: number, @Body() createArticleDto: CreateArticleDto) {
        return this.articleService.create(createArticleDto, userId);
    }

    @Get()
    findAll() {
        return this.articleService.findAll();
    }

    // @Get(`/popular`)
    // getPopular(@Query('skip') skip:number) {
    //   return this.articleService.popular(skip);
    // }
    @Get(`/popular`)
    getPopular(@Query() dto: PaginationArticleDto) {
        return this.articleService.popular(dto);
    }

    @Get(`/search`)
    search(@Query() dto: searchArticleDto) {
        return this.articleService.search(dto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.articleService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@User() userId: number, @Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
        return this.articleService.update(+id, updateArticleDto, userId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@User() userId: number, @Param('id') id: string) {
        return this.articleService.remove(+id, userId);
    }
}
