'use client';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/components/shadcn/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/components/shadcn/popover';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../shadcn/select';

type DatePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
} & Omit<React.ComponentPropsWithoutRef<typeof Button>, 'onChange' | 'value'>;

export const TimePicker = ({
  value,
  onChange,
  className,
  ...props
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className
          )}
          {...props}
        >
          {format(value, 'HH:mm') || <span>Pick a time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto items-center gap-2">
        <Select
          onValueChange={(val) => {
            return onChange(
              new Date(
                value.getFullYear(),
                value.getMonth(),
                value.getDate(),
                parseInt(val, 10),
                value.getMinutes()
              )
            );
          }}
          defaultValue={value.getHours().toString()}
        >
          <SelectTrigger className="border-none py-0 shadow-none">
            <SelectValue placeholder="Pick a Hour" />
          </SelectTrigger>
          <SelectContent className="max-h-50 overflow-auto">
            <SelectItem value="0">00</SelectItem>
            <SelectItem value="1">01</SelectItem>
            <SelectItem value="2">02</SelectItem>
            <SelectItem value="3">03</SelectItem>
            <SelectItem value="4">04</SelectItem>
            <SelectItem value="5">05</SelectItem>
            <SelectItem value="6">06</SelectItem>
            <SelectItem value="7">07</SelectItem>
            <SelectItem value="8">08</SelectItem>
            <SelectItem value="9">09</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="11">11</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="13">13</SelectItem>
            <SelectItem value="14">14</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="17">17</SelectItem>
            <SelectItem value="18">18</SelectItem>
            <SelectItem value="19">19</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="21">21</SelectItem>
            <SelectItem value="22">22</SelectItem>
            <SelectItem value="23">23</SelectItem>
          </SelectContent>
        </Select>
        :
        <Select
          value={value.getMinutes().toString()}
          onValueChange={(val) => {
            return onChange(
              new Date(
                value.getFullYear(),
                value.getMonth(),
                value.getDate(),
                value.getHours(),
                parseInt(val, 10)
              )
            );
          }}
        >
          <SelectTrigger className="border-none py-0 shadow-none">
            <SelectValue placeholder="Pick a Minute" />
          </SelectTrigger>
          <SelectContent className="max-h-50 overflow-auto">
            <SelectItem value="0">00</SelectItem>
            <SelectItem value="1">01</SelectItem>
            <SelectItem value="2">02</SelectItem>
            <SelectItem value="3">03</SelectItem>
            <SelectItem value="4">04</SelectItem>
            <SelectItem value="5">05</SelectItem>
            <SelectItem value="6">06</SelectItem>
            <SelectItem value="7">07</SelectItem>
            <SelectItem value="8">08</SelectItem>
            <SelectItem value="9">09</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="11">11</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="13">13</SelectItem>
            <SelectItem value="14">14</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="17">17</SelectItem>
            <SelectItem value="18">18</SelectItem>
            <SelectItem value="19">19</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="21">21</SelectItem>
            <SelectItem value="22">22</SelectItem>
            <SelectItem value="23">23</SelectItem>
            <SelectItem value="24">24</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="26">26</SelectItem>
            <SelectItem value="27">27</SelectItem>
            <SelectItem value="28">28</SelectItem>
            <SelectItem value="29">29</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="31">31</SelectItem>
            <SelectItem value="32">32</SelectItem>
            <SelectItem value="33">33</SelectItem>
            <SelectItem value="34">34</SelectItem>
            <SelectItem value="35">35</SelectItem>
            <SelectItem value="36">36</SelectItem>
            <SelectItem value="37">37</SelectItem>
            <SelectItem value="38">38</SelectItem>
            <SelectItem value="39">39</SelectItem>
            <SelectItem value="40">40</SelectItem>
            <SelectItem value="41">41</SelectItem>
            <SelectItem value="42">42</SelectItem>
            <SelectItem value="43">43</SelectItem>
            <SelectItem value="44">44</SelectItem>
            <SelectItem value="45">45</SelectItem>
            <SelectItem value="46">46</SelectItem>
            <SelectItem value="47">47</SelectItem>
            <SelectItem value="48">48</SelectItem>
            <SelectItem value="49">49</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="51">51</SelectItem>
            <SelectItem value="52">52</SelectItem>
            <SelectItem value="53">53</SelectItem>
            <SelectItem value="54">54</SelectItem>
            <SelectItem value="55">55</SelectItem>
            <SelectItem value="56">56</SelectItem>
            <SelectItem value="57">57</SelectItem>
            <SelectItem value="58">58</SelectItem>
            <SelectItem value="59">59</SelectItem>
          </SelectContent>
        </Select>
      </PopoverContent>
    </Popover>
  );
};
